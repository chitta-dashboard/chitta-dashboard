import { Theme } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useGetFarmersCount } from "../../../../utils/hooks/query";
import Icon from "../../../icons";
import { BufferLoader } from "../../../../utils/loaders/api-loader";
import S from "../dashboardBodyTop.styled";

const DashboardBodyTop = () => {
  const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const { totalFarmerCount, maleFarmerCount, femaleFarmerCount, farmerGroupCount, acreFieldValue, isFarmerDetailsLoading, isFarmerGroupLoading } =
    useGetFarmersCount();
  const StatisticsItems = [
    {
      id: 1,
      headCount: "+87",
      bodyCount: `${totalFarmerCount}`,
      footerName: "Total Farmers",
      icon: "farmer-count",
      isLoading: isFarmerDetailsLoading,
    },
    {
      id: 2,
      headCount: "+23",
      bodyCount: `${farmerGroupCount}`,
      footerName: "Group",
      icon: "groups",
      isLoading: isFarmerGroupLoading,
    },
    {
      id: 3,
      headCount: "+59",
      bodyCount: `${maleFarmerCount}`,
      footerName: "Farmer",
      icon: "male-farmer",
      isLoading: isFarmerDetailsLoading,
    },
    {
      id: 4,
      headCount: "+28",
      bodyCount: `${femaleFarmerCount}`,
      footerName: "Farmerette",
      icon: "female-farmer",
      isLoading: isFarmerDetailsLoading,
    },
    {
      id: 5,
      headCount: "-8",
      bodyCount: `${acreFieldValue?.toFixed(2)}`,
      footerName: "Fields Size (Acres)",
      icon: "farmland",
      isLoading: isFarmerDetailsLoading,
    },
    // {
    //   id: 6,
    //   headCount: "-122",
    //   bodyCount: 770,
    //   footerName: "Cultivation (Kg)",
    //   icon: "cultivation",
    // },
  ];

  var settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: xl ? 4 : md ? 4 : sm ? 3 : 2,
    slidesToScroll: 1,
    autoplay: false,
    centerPadding: "1rem",
  };

  return (
    <S.StasticsCardContainer>
      <Slider {...settings}>
        {StatisticsItems.map((card) => {
          return (
            <S.StasticsCard key={card.id}>
              <S.StatCardHeader>
                <S.StatCardHeaderLeft>
                  <S.StatCardIcon>
                    <Icon iconName={card.icon} />
                  </S.StatCardIcon>
                  <S.StatCardBody>{!card.isLoading ? <BufferLoader /> : card.bodyCount}</S.StatCardBody>
                </S.StatCardHeaderLeft>
                <S.StatCardHeaderRight>
                  <S.StatCardHeaderCount neg={parseInt(card.headCount) < 0}>{card.headCount}</S.StatCardHeaderCount>
                </S.StatCardHeaderRight>
              </S.StatCardHeader>
              <S.StatCardFooter>
                {card.footerName}
                <Icon iconName="three-dots" />
              </S.StatCardFooter>
            </S.StasticsCard>
          );
        })}
      </Slider>
    </S.StasticsCardContainer>
  );
};

export default DashboardBodyTop;
