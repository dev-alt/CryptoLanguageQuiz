'use client';

import "@/styles/globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import SidebarItem from "@/components/sidebar/myProgress";
import { InviteFriend } from "@/components/sidebar/inviteFriend";
import { CommunityBar } from "@/components/sidebar/communityInfo";
import { useAuth } from "@/context/AuthContext";
import { useQuery, gql } from '@apollo/client';
import { GET_USER_PROFILE_BY_USER_ID } from "@/queries/graphql";
import LandingPage from "./landingPage";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, user } = useAuth();

  // Fetch user profile data when logged in
  const { loading, error, data: profileData } = useQuery(GET_USER_PROFILE_BY_USER_ID, {
    variables: { userId: user?.userId },
    onError: (error) => {
      console.error("Error fetching user profile:", error);
    },
    skip: !isLoggedIn,
  });

  if (!isLoggedIn) {
    return <LandingPage />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div className="relative flex flex-col min-h-screen bg-gradient-to-br from-blue-950 to-purple-900">
      {/* ... (Navbar) ... */}
      <Navbar isLoggedIn={isLoggedIn} />
              {/* Main Content and Sidebar */}
      <main className="container mx-auto max-w-14xl pt-4 px-6 flex-grow">
        <div className="flex flex-col md:flex-row">
        
          {/* Main body */}
          <div className="flex-1 mb-8 md:mb-0 flex-shrink-0">{children}</div>
          {/* Sidebar  */}
          <div className="md:min-h-screen md:w-80 flex flex-col items-stretch p-4 space-y-4 order-last"> 
            <SidebarItem {...profileData?.profileByUserId} />
            <div className="hidden md:flex"> 
              <InviteFriend />
            </div>
            <div className="hidden md:flex"> 
              <CommunityBar />
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AppLayout;