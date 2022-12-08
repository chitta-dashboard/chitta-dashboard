import { useNavigate } from "react-router-dom";
import { Theme } from "@mui/material";
import Slider from "react-slick";
import useMediaQuery from "@mui/material/useMediaQuery";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useFetch } from "../../../../utils/hooks/query";
import Icon from "../../../icons";
import { ACRETOCENT, ENDPOINTS } from "../../../../utils/constants";
import { farmerDetail } from "../../../../utils/context/farmersDetails";
import { BufferLoader } from "../../../../utils/loaders/api-loader";
import S from "../dashboardBodyTop.styled";

const DashboardBodyTop = () => {
  const navigate = useNavigate();
  const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const {
    formatChangeSuccess: farmerDetailsSuccess,
    result: { data: farmerDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);

  const {
    formatChangeSuccess: farmerGroupSuccess,
    result: { data: farmerGroupById },
  } = useFetch(ENDPOINTS.farmerGroup);

  const { result } = useFetch(ENDPOINTS.admin);

  let farmerDetailsByIdArray: farmerDetail[] = farmerDetailsSuccess ? Object.values(farmerDetailsById) : [];
  let farmerGroupByIdArray = farmerGroupSuccess ? Object.values(farmerGroupById) : [];

  let totalFarmerCount = farmerDetailsByIdArray.length;
  let femaleFarmerCount = farmerDetailsByIdArray.filter((item) => item.sex === "FEMALE").length;
  let farmerGroupCount = farmerGroupByIdArray.length;
  let totalAcreCount = farmerDetailsSuccess
    ? farmerDetailsByIdArray.reduce((a, b) => {
        let value = (b.landAreaInCent as string) ? parseInt(b.landAreaInCent as string) : 0;
        return a + value;
      }, 0) / ACRETOCENT
    : 0;

  const StatisticsItems = [
    {
      id: 1,
      headCount: "+87",
      bodyCount: `${totalFarmerCount}`,
      footerName: "Total Farmers",
      icon: "farmer-count",
      navigate: "/farmers-details",
      isSuccess: farmerDetailsSuccess,
    },
    {
      id: 2,
      headCount: "+23",
      bodyCount: `${farmerGroupCount}`,
      footerName: "Group",
      icon: "groups",
      navigate: "/farmers-group",
      isSuccess: farmerGroupSuccess,
    },
    {
      id: 3,
      headCount: "+59",
      bodyCount: `${totalFarmerCount - femaleFarmerCount}`,
      footerName: "Farmer",
      icon: "male-farmer",
      isSuccess: farmerDetailsSuccess,
    },
    {
      id: 4,
      headCount: "+28",
      bodyCount: `${femaleFarmerCount}`,
      footerName: "Farmerette",
      icon: "female-farmer",
      isSuccess: farmerDetailsSuccess,
    },
    {
      id: 5,
      headCount: "-8",
      bodyCount: `${totalAcreCount.toFixed(2)}`,
      footerName: "Fields Size (Acres)",
      icon: "farmland",
      isSuccess: farmerDetailsSuccess,
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
            <S.StasticsCard
              key={card.id}
              onClick={() => {
                card.navigate && navigate(card.navigate);
              }}
            >
              <S.StatCardHeader>
                <S.StatCardHeaderLeft>
                  <S.StatCardIcon>
                    <Icon iconName={card.icon} />
                  </S.StatCardIcon>
                  <S.StatCardBody>{card.isSuccess ? card.bodyCount : <BufferLoader />}</S.StatCardBody>
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
