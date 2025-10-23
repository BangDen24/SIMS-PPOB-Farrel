const BannerCard = ({ banners }) => {
  return (
    <div className="min-w-[300px] flex-shrink-1">
      <img
        src={banners.banner_image}
        alt={banners.banner_name}
        className="w-full h-[150px] object-cover rounded-lg shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105"
        draggable="false"
      />
    </div>
  );
};

export default BannerCard;
