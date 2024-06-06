import { useGetUserInfo } from "@/api/UserApi";
import { useAuth } from "@clerk/clerk-react";

const Role = () => {
  const { userId } = useAuth();
  const { userInfo, isLoading } = useGetUserInfo(userId!);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>No user information available</div>;
  }

  return <div className="mb-8 text-3xl">{userInfo.role} of {userInfo.organization}</div>;
};

export default Role;