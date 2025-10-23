import { useGetProfileQuery } from "../store/services/profileApi";
import { useGetBalanceQuery } from "../store/services/balanceApi";
import {
  useGetBannersQuery,
  useGetServicesQuery,
} from "../store/services/serviceApi";
import BalanceCard from "../components/features/homepage/balanceCard";
import ServiceCard from "../components/features/homepage/serviceCard";
import ProfileCard from "../components/features/homepage/profileCard";
import BannerCard from "../components/features/homepage/bannerCard";
import { useRef, useState } from "react";
import { Circle } from "lucide-react";

const HomePage = () => {
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const { data: balance, isLoading: balanceLoading } = useGetBalanceQuery();
  const { data: services, isLoading: servicesLoading } = useGetServicesQuery();
  const { data: banner, isLoading: bannerLoading } = useGetBannersQuery();

  const bannerScrollRef = useRef(null);
  const serviceScrollRef = useRef(null);
  const [isDraggingBanner, setIsDraggingBanner] = useState(false);
  const [isDraggingService, setIsDraggingService] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleBannerMouseDown = (e) => {
    setIsDraggingBanner(true);
    if (bannerScrollRef.current) {
      setStartX(e.pageX - bannerScrollRef.current.offsetLeft);
      setScrollLeft(bannerScrollRef.current.scrollLeft);
    }
  };

  const handleBannerMouseMove = (e) => {
    if (!isDraggingBanner) return;
    e.preventDefault();
    if (bannerScrollRef.current) {
      const x = e.pageX - bannerScrollRef.current.offsetLeft;
      const walk = x - startX;
      bannerScrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleBannerMouseUp = () => {
    setIsDraggingBanner(false);
  };

  const handleServiceMouseDown = (e) => {
    setIsDraggingService(true);
    if (serviceScrollRef.current) {
      setStartX(e.pageX - serviceScrollRef.current.offsetLeft);
      setScrollLeft(serviceScrollRef.current.scrollLeft);
    }
  };

  const handleServiceMouseMove = (e) => {
    if (!isDraggingService) return;
    e.preventDefault();
    if (serviceScrollRef.current) {
      const x = e.pageX - serviceScrollRef.current.offsetLeft;
      const walk = x - startX;
      serviceScrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleServiceMouseUp = () => {
    setIsDraggingService(false);
  };

  if (profileLoading || balanceLoading || servicesLoading || bannerLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Circle className="animate-spin text-red-500" size={36} />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] p-4 md:p-6 lg:p-8 text-black">
      <div className="max-w-6xl mx-auto">
        {/* Profile & Balance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 mb-6 lg:pr-[10%]">
          {profileLoading ? (
            <div className="lg:col-span-2 bg-gray-200 rounded-lg h-32 animate-pulse" />
          ) : (
            <div className="lg:col-span-2">
              <ProfileCard profile={profile} />
            </div>
          )}

          {balanceLoading ? (
            <div className="lg:col-span-3 bg-gray-200 rounded-lg h-32 animate-pulse" />
          ) : (
            <div className="lg:col-span-3">
              <BalanceCard balance={balance} />
            </div>
          )}
        </div>

        {/* Services Section - Horizontal Scroll on Mobile */}
        <div className="rounded-lg mb-6 lg:pr-[10%]">
          {servicesLoading ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="min-w-[80px] h-20 bg-gray-200 rounded-lg animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <div
              ref={serviceScrollRef}
              className="flex lg:justify-between gap-4 overflow-x-auto pb-2 no-scrollbar cursor-grab active:cursor-grabbing"
              onMouseDown={handleServiceMouseDown}
              onMouseUp={handleServiceMouseUp}
              onMouseLeave={handleServiceMouseUp}
              onMouseMove={handleServiceMouseMove}
            >
              {services?.data?.map((service) => (
                <ServiceCard key={service.service_code} service={service} />
              ))}
            </div>
          )}
        </div>

        {/* Banner Section */}
        <div className="rounded-lg">
          {bannerLoading ? (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="min-w-[280px] md:min-w-[300px] h-[150px] bg-gray-200 rounded-lg animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          ) : (
            <>
              <p className="mb-4 font-semibold text-sm md:text-base">
                Temukan promo menarik
              </p>
              <div
                ref={bannerScrollRef}
                className="flex gap-4 overflow-x-auto pb-2 no-scrollbar cursor-grab active:cursor-grabbing"
                onMouseDown={handleBannerMouseDown}
                onMouseUp={handleBannerMouseUp}
                onMouseLeave={handleBannerMouseUp}
                onMouseMove={handleBannerMouseMove}
              >
                {banner?.data?.map((banners) => (
                  <BannerCard key={banners.banner_name} banners={banners} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
