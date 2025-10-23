const ProfileCard = ({ profile }) => {
  const handleImageError = (e) => {
    e.target.src = "/profile.png"; 
  };

  return (
    <div className="p-6 mb-6">
      <img
        src={profile?.data?.profile_image || "/profile.png"}
        onError={handleImageError}
        alt={profile?.data?.first_name}
        className="w-16 h-16 rounded-full mb-4 object-cover"
      />
      <h2 className="text-md">Selamat Datang,</h2>  
      <p className="text-xl font-semibold">
        {profile?.data?.first_name} {profile?.data?.last_name}
      </p>
    </div>
  );
};

export default ProfileCard;
