import { Theme } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFetch } from "../../../../utils/hooks/query";
import Icon from "../../../icons";
import { ENDPOINTS, Endpoints } from "../../../../utils/constants";
import S from "../dashboardBodyTop.styled";

const DashboardBodyTop = () => {
  const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const {
    result: { data: farmerDetails },
  } = useFetch(ENDPOINTS.farmerDetails as Endpoints);
  const {
    result: { data: farmerGroup },
  } = useFetch(ENDPOINTS.farmerGroup as Endpoints);
  const FarmerCount = farmerDetails && Object.values(farmerDetails).length;
  const FarmerGroupCount = farmerGroup && Object.values(farmerGroup).length;
  const MaleFarmerCount = farmerDetails && Object.values(farmerDetails).filter((item: any) => ["MALE"].includes(item.sex)).length;
  const FemaleFarmerCount = farmerDetails && Object.values(farmerDetails).filter((item: any) => ["FEMALE"].includes(item.sex)).length;
  const acreFieldValue =
    farmerDetails &&
    Object.values(farmerDetails)
      .filter((item: any) => item.landAreaInCent)
      .map((i: any) => i.landAreaInCent)
      .reduce((a: string, b: string) => parseInt(a) + parseInt(b)) / 100.021;

  const StatisticsItems = [
    {
      id: 1,
      headCount: "+87",
      bodyCount: `${FarmerCount}`,
      footerName: "Total Farmers",
      icon: "farmer-count",
    },
    {
      id: 2,
      headCount: "+23",
      bodyCount: `${FarmerGroupCount}`,
      footerName: "Group",
      icon: "groups",
    },
    {
      id: 3,
      headCount: "+59",
      bodyCount: `${MaleFarmerCount}`,
      footerName: "Farmer",
      icon: "male-farmer",
    },
    {
      id: 4,
      headCount: "+28",
      bodyCount: `${FemaleFarmerCount}`,
      footerName: "Farmerette",
      icon: "female-farmer",
    },
    {
      id: 5,
      headCount: "-8",
      bodyCount: `${acreFieldValue?.toFixed(2)}`,
      footerName: "Fields Size (Acres)",
      icon: "farmland",
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
    slidesToShow: xl ? 5 : md ? 4 : 3,
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
                  <S.StatCardBody>{card.bodyCount}</S.StatCardBody>
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
