import { FC } from "react";
import { S } from "./share-certificate-table.styled";

interface Props {}

const ShareCertificateTable: FC<Props> = ({}) => {
  return (
    <S.ShareCertificateTable>
      <S.CertificateMainContent>
        <S.CertificateTitle>MEMORANDUM OF TRANSFER OF SHARE(S) MENTIONED OVERLEAF</S.CertificateTitle>
        <S.CustomTableContainer>
          <S.CustomTable>
            <S.CustomTableHead>
              <S.CustomTableRow>
                <S.CustomTableHeadCell width={"100px"}>DATE</S.CustomTableHeadCell>
                <S.CustomTableHeadCell width={"135px"}>TRANSFER NO.</S.CustomTableHeadCell>
                <S.CustomTableHeadCell width={"135px"}>REGISTER FOLIO</S.CustomTableHeadCell>
                <S.CustomTableHeadCell>NAMES OF TRANSFEREE(S)</S.CustomTableHeadCell>
                <S.CustomTableHeadCell width={"130px"}>INITIALS</S.CustomTableHeadCell>
                <S.CustomTableHeadCell width={"200px"}>AUTHORIZED SIGNATORY</S.CustomTableHeadCell>
              </S.CustomTableRow>
            </S.CustomTableHead>
            <S.CustomTableBody>
              <S.CustomTableRow>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
              </S.CustomTableRow>
              <S.CustomTableRow>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
              </S.CustomTableRow>
              <S.CustomTableRow>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
              </S.CustomTableRow>
              <S.CustomTableRow>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
              </S.CustomTableRow>
              <S.CustomTableRow>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
              </S.CustomTableRow>
              <S.CustomTableRow>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
              </S.CustomTableRow>
              <S.CustomTableRow>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
                <S.CustomTableBodyCell></S.CustomTableBodyCell>
              </S.CustomTableRow>
            </S.CustomTableBody>
          </S.CustomTable>
        </S.CustomTableContainer>
      </S.CertificateMainContent>
    </S.ShareCertificateTable>
  );
};

export default ShareCertificateTable;
