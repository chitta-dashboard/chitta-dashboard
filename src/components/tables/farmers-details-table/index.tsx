import React,{useState,useEffect} from "react";

import TableWrapper from "../../custom-tables/table";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";

interface FarmersDetailsType {
  id: number;
  image: string;
  name: string;
  mobileNo: number;
  farmersGroup: string;
}

const farmersDetails: FarmersDetailsType[] = [
  {
    id: 1,
    image: "image",
    name: "Arokiya0",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 2,
    image: "image",
    name: "Arokiya1",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 3,
    image: "image",
    name: "Arokiya2",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 4,
    image: "image",
    name: "Arokiya3",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 5,
    image: "image",
    name: "Arokiya Arokiya Arokiya4",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 6,
    image: "image",
    name: "Arokiya5",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 7,
    image: "image",
    name: "Arokiya6",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 8,
    image: "image",
    name: "Arokiya7",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 9,
    image: "image",
    name: "Arokiya8",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 10,
    image: "image",
    name: "Arokiya9",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 11,
    image: "image",
    name: "Arokiya10",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 12,
    image: "image",
    name: "Arokiya11",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 13,
    image: "image",
    name: "Arokiya12",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 14,
    image: "image",
    name: "Arokiya13",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
  {
    id: 15,
    image: "image",
    name: "Arokiya14",
    mobileNo: 8610010875,
    farmersGroup: "விவசாயிகள் சங்கம்",
  },
];

const FarmersDetailsTable = () => {
const [users, setUsers] = useState<FarmersDetailsType[]>([]);

  useEffect(() => {
    setUsers(farmersDetails);
  }, []);

  const handleChange = (e:any) => {
    const { name, checked } = e.target;
    if (name === 'allSelect') {
      let tempUser = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(tempUser);
    } else {
      let tempUser = users.map((user) => (user.id === parseInt(name) ? { ...user, isChecked: checked } : user));
      setUsers(tempUser);
    }
  }

  return (
    <TableWrapper>
      <Header users={users} setUsers={setUsers} handleChange={(e:any)=>handleChange(e)} />
      <Body users={users} setUsers={setUsers} handleChange={(e:any)=>handleChange(e)} />
      <Footer />
    </TableWrapper>
  );
};

export default FarmersDetailsTable;
