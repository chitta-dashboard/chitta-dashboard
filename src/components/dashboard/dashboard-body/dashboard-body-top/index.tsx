import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import S from "../dashboardBodyTop.styled";
import GroupIcon from "../../../../assets/images/Group.png";

type Props = {};

const DashboardBodyTop = (props: Props) => {
  // interface Statistics {
  //   id: number;
  //   headerCount: number;
  //   cardCount: number;
  //   footerName: string;
  // };

  const StatisticsItems = [
    {
      id: 1,
      headCount: "+87",
      bodyCount: 326,
      footerName: "Total Farmers",
    },
    {
      id: 2,
      headCount: "+23",
      bodyCount: 169,
      footerName: "Group",
    },
    {
      id: 3,
      headCount: "+59",
      bodyCount: 226,
      footerName: "Farmer",
    },
    {
      id: 4,
      headCount: "+28",
      bodyCount: 100,
      footerName: "Farmerette",
    },
    {
      id: 5,
      headCount: "-8",
      bodyCount: 77,
      footerName: "Fiels Size (Acres)",
    },
    {
      id: 6,
      headCount: "-122",
      bodyCount: 770,
      footerName: "Cultivation (Kg)",
    },
  ];

  var settings = {
    dots: false,
    arrows:true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay:false
  };

  return (
    <>
      <S.StasticsCardContainer>
        <Slider {...settings}>
          {StatisticsItems.map((card) => {
            return (
              <S.StasticsCard key={card.id}>
                <S.StatCardHeader>
                  <S.StatCardIcon src={GroupIcon} alt="Group -icon" />
                  <S.StatCardHeaderCount>{card.headCount}</S.StatCardHeaderCount>
                </S.StatCardHeader>
                <S.StatCardBody>{card.bodyCount}</S.StatCardBody>
                <S.StatCardFooter>
                  {card.footerName}
                  <i>three-dots</i>
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
