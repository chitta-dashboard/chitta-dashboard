import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import S from "../dashboardBodyTop.styled";
import useMediaQuery from "@mui/material/useMediaQuery";
import Icon from "../../../icons";

type Props = {};

const DashboardBodyTop = (props: Props) => {
  // interface Statistics {
  //   id: number;
  //   headerCount: number;
  //   cardCount: number;
  //   footerName: string;
  // };
  const xl = useMediaQuery((theme:any) => theme.breakpoints.up("xl"));
  const md = useMediaQuery((theme:any) => theme.breakpoints.up("md"));

  const StatisticsItems = [
    {
      id: 1,
      headCount: "+87",
      bodyCount: 326,
      footerName: "Total Farmers",
      icon: "farmer-count",
    },
    {
      id: 2,
      headCount: "+23",
      bodyCount: 169,
      footerName: "Group",
      icon: "groups",
    },
    {
      id: 3,
      headCount: "+59",
      bodyCount: 226,
      footerName: "Farmer",
      icon: "male-farmer",
    },
    {
      id: 4,
      headCount: "+28",
      bodyCount: 100,
      footerName: "Farmerette",
      icon: "female-farmer",
    },
    {
      id: 5,
      headCount: "-8",
      bodyCount: 77,
      footerName: "Fiels Size (Acres)",
      icon: "farmland",
    },
    {
      id: 6,
      headCount: "-122",
      bodyCount: 770,
      footerName: "Cultivation (Kg)",
      icon: "cultivation",
    },
    {
      id: 7,
      headCount: "-122",
      bodyCount: 770,
      footerName: "Cultivation (Kg)",
      icon: "cultivation",
    },
    {
      id: 8,
      headCount: "-122",
      bodyCount: 770,
      footerName: "Cultivation (Kg)",
      icon: "cultivation",
    },
  ];

  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: xl ? 5 : md ? 4 : 3,
    slidesToScroll: 1,
    autoplay: false,
    centerPadding: "1rem",
  };

  return (
    <>
      <S.StasticsCardContainer>
        <Slider {...settings}>
          {StatisticsItems.map((card) => {
            return (
              <S.StasticsCard key={card.id}>
                <S.StatCardHeader>
                  <S.StatCardIcon>
                    <Icon iconName={card.icon} />
                  </S.StatCardIcon>
                  <S.StatCardHeaderCount neg={parseInt(card.headCount) < 0}>{card.headCount}</S.StatCardHeaderCount>
                </S.StatCardHeader>
                <S.StatCardBody>{card.bodyCount}</S.StatCardBody>
                <S.StatCardFooter>
                  {card.footerName}
                  <Icon iconName="three-dots" />
                </S.StatCardFooter>
              </S.StasticsCard>
            );
          })}
        </Slider>
      </S.StasticsCardContainer>
    </>
  );
};

export default DashboardBodyTop;
