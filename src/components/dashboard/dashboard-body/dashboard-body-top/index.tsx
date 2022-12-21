import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Theme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Slider from "react-slick";
import { useFetch } from "../../../../utils/hooks/query";
import { ACRETOCENT, ENDPOINTS } from "../../../../utils/constants";
import { farmerDetail } from "../../../../utils/context/farmersDetails";
import { BufferLoader } from "../../../../utils/loaders/api-loader";
import { formatNumberToSmallScale } from "../../../../utils/helpers";
import PopOver from "../../../common-components/pop-over";
import Icon from "../../../icons";
import S from "../dashboardBodyTop.styled";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DashboardBodyTop = () => {
  const navigate = useNavigate();
  const xl = useMediaQuery((theme: Theme) => theme.breakpoints.up("xl"));
  const md = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const sm = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  const {
    formatChangeSuccess: farmerDetailsSuccess,
    result: { data: farmerDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);

  const {
    formatChangeSuccess: farmerGroupSuccess,
    result: { data: farmerGroupById },
  } = useFetch(ENDPOINTS.farmerGroup);

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
  interface Ivalue {
    "9eb5af43-f224-4434-9488-fddf4eb004dc": string;
  }
  const [isPopOver, setIsPopOver] = useState<HTMLButtonElement | null>(null);
  const [popId, setPopId] = useState<string>("");
  const [value, setValue] = useState<Ivalue>({
    "9eb5af43-f224-4434-9488-fddf4eb004dc": "Acres",
  });

  const StatisticsItems = [
    {
      id: "15c09e0a-274c-4bd5-9b2b-88581ab51f25",
      headCount: "+87",
      bodyCount: `${totalFarmerCount}`,
      footerName: "Total Farmers",
      icon: "farmer-count",
      navigate: "/farmers-details",
      isSuccess: farmerDetailsSuccess,
    },
    {
      id: "babdd103-fd3c-4a90-87f7-21d1ef5a9106",
      headCount: "+23",
      bodyCount: `${farmerGroupCount}`,
      footerName: "Group",
      icon: "groups",
      navigate: "/farmers-group",
      isSuccess: farmerGroupSuccess,
    },
    {
      id: "ddc859fc-b75f-4b48-ba6d-e30aadc3e9ac",
      headCount: "+59",
      bodyCount: `${totalFarmerCount - femaleFarmerCount}`,
      footerName: "Farmer",
      icon: "male-farmer",
      isSuccess: farmerDetailsSuccess,
    },
    {
      id: "0fbd3d99-be00-4415-8b90-0bd0f833ee77",
      headCount: "+28",
      bodyCount: `${femaleFarmerCount}`,
      footerName: "Farmerette",
      icon: "female-farmer",
      isSuccess: farmerDetailsSuccess,
    },
    {
      id: "9eb5af43-f224-4434-9488-fddf4eb004dc",
      headCount: "-8",
      bodyCount: `${
        value["9eb5af43-f224-4434-9488-fddf4eb004dc"] === "Cents"
          ? formatNumberToSmallScale(Number((totalAcreCount * ACRETOCENT).toFixed(2)))
          : formatNumberToSmallScale(Number(totalAcreCount.toFixed(2)))
      }`,
      footerName: `Fields Size (${value["9eb5af43-f224-4434-9488-fddf4eb004dc"]})`,
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

  const slides = () => {
    switch (xl || md || sm || null) {
      case xl:
        return 4;
      case md:
        return 4;
      case sm:
        return 3;
      default:
        return 2;
    }
  };

  let settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: slides(),
    slidesToScroll: 1,
    autoplay: false,
    centerPadding: "1rem",
  };

  const popOverStatisticsItems: any = {
    "15c09e0a-274c-4bd5-9b2b-88581ab51f25": [],
    "babdd103-fd3c-4a90-87f7-21d1ef5a9106": [],
    "ddc859fc-b75f-4b48-ba6d-e30aadc3e9ac": [],
    "0fbd3d99-be00-4415-8b90-0bd0f833ee77": [],
    "9eb5af43-f224-4434-9488-fddf4eb004dc": [
      { id: "1", name: "Acres" },
      { id: "2", name: "Cents" },
    ],
  };

  const onPopOverHandler = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setPopId(id);
    setIsPopOver(event.currentTarget);
  };

  const onChangeDataHandler = (updateValue: string) => {
    setValue({ ...value, [popId as string]: updateValue });
    setIsPopOver(null);
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
                <Icon iconName="three-dots" clickHandler={(event) => onPopOverHandler(event, card.id)} />
              </S.StatCardFooter>
              {isPopOver && popOverStatisticsItems[popId].length > 0 && (
                <PopOver
                  id={card.id}
                  value={value[popId as keyof Ivalue]}
                  isOpen={isPopOver}
                  onSelectHandler={onChangeDataHandler}
                  onPopCloseHandler={() => setIsPopOver(null)}
                  popOverOptions={popOverStatisticsItems[popId]}
                />
              )}
            </S.StasticsCard>
          );
        })}
      </Slider>
    </S.StasticsCardContainer>
  );
};

export default DashboardBodyTop;
