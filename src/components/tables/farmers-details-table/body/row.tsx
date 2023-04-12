import { useState, useRef, FC, useEffect, Ref } from "react";
import { Checkbox, Stack, TableRow } from "@mui/material";
import { useReactToPrint } from "react-to-print";
import { useAuthContext } from "../../../../utils/context/auth";
import { deleteProfile, uploadProfile } from "../../../../services/s3-client";
import { extractProfileName, generateProfileName } from "../../../../utils/helpers";
import { s3ConfigTypes } from "../../../../types";
import { ENDPOINTS, fileValidation, Message, imageCompressor, encryptText } from "../../../../utils/constants";
import FarmersDetailsIconModal from "../../../icon-modals/farmers-detail-icon-modal";
import FarmersDetailsModal from "../../../modals/farmers-details-modal";
import DeleteModal from "../../../modals/delete-modal";
import ConfirmationModal from "../../../modals/confirmation-modal";
import FarmerDetailsForm from "../../../../views/farmer-detail-page/FarmerDetailsForm";
import IdCardBody from "../../../id-card/id-card-body";
import IdCardModal from "../../../modals/id-download-modal";
import CS from "../../../common-styles/commonStyles.styled";
import ImagePreview from "../../../../utils/imageCrop/imagePreview";
import { farmerDetail, representative, useFarmerDetailsContext } from "../../../../utils/context/farmersDetails";
import { useDelete, useEdit, useFetch } from "../../../../utils/hooks/query";
import FarmerBankDetailModal from "../../../modals/farmer-bank-detail-confirmation-modal";
import Toast from "../../../../utils/toast";
import { IMdDetails } from "../../../../utils/context/mdDetails";
import placeHolderImg from "../../../../assets/images/profile-placeholder.jpg";
import S from "./body.styled";
import { editCustomer } from "../../../../queries";
import FormSelectionModal from "../../../modals/form-selection-modal";
import PasswordModal from "../../../modals/password-modal";
import CredentialsCertificate from "../../../../views/credentials-certificate";

interface FarmersDetailsRowProps {
  user: farmerDetail | any;
  removeGroupMember: (id: string, group: string, isAdd: boolean) => void;
}

interface farmerData {
  id: string | null;
  password: string | null;
}

const FarmersDetailsRow: FC<FarmersDetailsRowProps> = ({ user, removeGroupMember }) => {
  //state values
  const { addNotification, loader } = useAuthContext();
  const { checkboxSelect, selectedFarmers, setFarmerBankDetail } = useFarmerDetailsContext();
  const [image, setImage] = useState("");
  const [idCard, setIdCard] = useState(false);
  const [editData, setEditData] = useState<IMdDetails>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [iconModal, setIconModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [confirmModal, setConfirmModal] = useState<boolean>(false);
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [formSelectionModal, setFormSelectionModal] = useState<boolean>(false);
  const [openFarmerRowModal, setOpenFarmerRowModal] = useState<string | null>(null);
  const [farmerIdtoPrint, setFarmerIdtoPrint] = useState<number | string | null>(null);
  const [farmerData, setFarmerData] = useState<farmerData>({ id: null, password: null });

  //constants
  const {
    formatChangeSuccess: isSuccess,
    result: { data: mdDetailsById },
  } = useFetch(ENDPOINTS.mdDetails);
  let {
    formatChangeSuccess: isFarmerDetailsSuccess,
    result: { data: farmersDetailsById },
  } = useFetch(ENDPOINTS.farmerDetails);
  const idCardRef = useRef<HTMLDivElement>();
  const farmerDetailFormRef = useRef<HTMLDivElement>();
  const credentialCertificate = useRef<HTMLDivElement>();
  const hiddenFileInput: any = useRef<HTMLInputElement>();
  const { mutate: editMdDetail } = useEdit(ENDPOINTS.mdDetails);
  const { mutate: editFarmer } = useEdit(ENDPOINTS.farmerDetails);
  const { mutate: farmerDelete } = useDelete(ENDPOINTS.farmerDetails);
  const { mutate: mdDelete } = useDelete(ENDPOINTS.mdDetails);

  //functions
  // Tab IconModal Open & Close Handler
  const iconModalHandler = () => setIconModal(!iconModal);

  //Edit Farmers Details Handler
  const editFarmerDetailHandler = () => {
    setEditMode(!editMode);
    setFarmerBankDetail(true);
  };

  //Update Farmers Details Handler
  const updateFarmerDetail = (data: farmerDetail) => {
    setEditData(data);
    confirmModalHandler();
  };

  // ID Card Modal Handler
  const idCardhandler = () => setIdCard(!idCard);

  // Delete Modal Handler
  const deleteModalHandler = () => setDeleteModal(!deleteModal);

  // confirm Modal Handler
  const confirmModalHandler = () => setConfirmModal(!confirmModal);

  const getURL = (data: farmerDetail) => data["profile"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    let isValid = e.target && fileValidation(e.target.files[0].name);
    e.target.files && isValid && setImage(window.URL.createObjectURL(e.target.files[0]));
    return false;
  };

  // this function is to clear the value of input field, so we can upload same file as many time has we want.
  const onInputClick = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const element = event.target as HTMLInputElement;
    element.value = "";
  };

  const handleIconClick = () => hiddenFileInput && hiddenFileInput.current.click();

  const generateFarmerDetailForm = useReactToPrint({
    documentTitle: `${user.name}_FarmerDetail_form`,
    content: () => farmerDetailFormRef.current as HTMLDivElement,
    onAfterPrint() {
      setFarmerBankDetail(false);
    },
  });

  const NavigateToFarmerDetailForm = (farmerId: string) => {
    setOpenFarmerRowModal(farmerId);
  };

  const credentialCertificateHandler = useReactToPrint({
    documentTitle: "Credential_certificate",
    content: () => credentialCertificate.current as HTMLDivElement,
    onBeforePrint() {
      setOpenPasswordModal(false);
    },
    onAfterPrint() {
      setFarmerData({ id: null, password: null });
    },
    pageStyle: `@media print {
        @page {
          size: "a4 portrait";
          margin:"0";
        }
      }`,
  });

  const handleCroppedImage = async (image: string) => {
    if (!image) return;
    const targetFarmerProfile = user.profile;
    if (targetFarmerProfile) {
      const deleteRes = await deleteProfile(extractProfileName(targetFarmerProfile), s3ConfigTypes.farmer);
      if (!deleteRes) return;
    }
    const profileName = `${s3ConfigTypes.farmer}_${user.id}_${Date.now()}`;
    const profileBlob = await fetch(image).then((res) => res.blob());
    const compressedProfile = await imageCompressor(profileBlob);
    const namedProfile = generateProfileName(compressedProfile, profileName);
    const profile = await uploadProfile(namedProfile, s3ConfigTypes.farmer);
    const isFarmerInMd = Object.values(isSuccess && (mdDetailsById as IMdDetails[])).find((data) => data.farmerId === user.id)?.id;
    editFarmer({
      editedData: { ...user, profile },
      successCb: () => {
        !isFarmerInMd && Toast({ message: "Farmer Edited Successfully.", type: "success" });
        if (isFarmerInMd) {
          setTimeout(() => {
            editMdDetail({
              editedData: { ...user, profile, farmerId: user.id, id: isFarmerInMd },
              successCb: () => Toast({ message: "Farmer Edited Successfully.", type: "success" }),
              errorCb: () => Toast({ message: "Request failed! Please try again.", type: "error" }),
            });
          }, 0);
        }
      },
    });
  };

  const HandleRepresentativeOf = (editedFarmer: farmerDetail, oldId: string, newId: string) => {
    const newFarmer = newId && isFarmerDetailsSuccess && farmersDetailsById[newId];
    const oldFarmer = oldId && isFarmerDetailsSuccess && farmersDetailsById[oldId];
    const representativeOfOldFarmer =
      oldId && Boolean(oldFarmer.representativeOf.length) ? oldFarmer.representativeOf.filter((f: representative) => f?.id !== editedFarmer?.id) : [];
    const representativeOfNewFarmer = {
      id: editedFarmer.id,
      name: editedFarmer.name,
      phoneNumber: editedFarmer.phoneNumber ?? "",
      pk: editedFarmer.PK ?? "",
    };

    const isNewFarmerInMd = newId
      ? Object.values(isSuccess && (mdDetailsById as IMdDetails[])).find((md) => md.farmerId === farmersDetailsById[newId].id)?.id
      : null;
    const isOldFarmerInMd = oldId
      ? Object.values(isSuccess && (mdDetailsById as IMdDetails[])).find((md) => md.farmerId === farmersDetailsById[oldId].id)?.id
      : null;

    const newMd = newId && isSuccess && mdDetailsById[isNewFarmerInMd];
    const oldMd = oldId && isSuccess && mdDetailsById[isOldFarmerInMd];

    if (newId && oldId) {
      const newFarmerData = {
        ...newFarmer,
        representativeOf: [...newFarmer.representativeOf, representativeOfNewFarmer],
      };
      const oldFarmerData = {
        ...oldFarmer,
        representativeOf: [...representativeOfOldFarmer],
      };
      editFarmer({
        editedData: newFarmerData,
        successCb: () => {
          setTimeout(() => {
            editFarmer({
              editedData: oldFarmerData,
              successCb: () => {
                !isNewFarmerInMd && !isOldFarmerInMd && Toast({ message: "Farmer Edited Successfully.", type: "success" });

                if (isNewFarmerInMd && isOldFarmerInMd) {
                  setTimeout(() => {
                    editMdDetail({
                      editedData: {
                        ...newMd,
                        representativeOf: [...newMd.representativeOf, representativeOfNewFarmer],
                      },
                      successCb: () => {
                        setTimeout(() => {
                          editMdDetail({
                            editedData: {
                              ...oldMd,
                              representativeOf: [...representativeOfOldFarmer],
                            },
                            successCb: () => {
                              Toast({ message: "Representative Updated Successfully.", type: "success" });
                            },
                            errorCb: () => {
                              Toast({ message: "Updating Md request failed! Please try again.", type: "error" });
                            },
                          });
                        }, 0);
                      },
                      errorCb: () => {
                        Toast({ message: "Updating Md request failed! Please try again.", type: "error" });
                      },
                    });
                  }, 0);
                }
                if (isNewFarmerInMd && !isOldFarmerInMd) {
                  setTimeout(() => {
                    editMdDetail({
                      editedData: {
                        ...newMd,
                        representativeOf: [...newMd.representativeOf, representativeOfNewFarmer],
                      },
                      successCb: () => {
                        Toast({ message: "Representative Updated Successfully.", type: "success" });
                      },
                      errorCb: () => {
                        Toast({ message: "Updating Md request failed! Please try again.", type: "error" });
                      },
                    });
                  }, 0);
                }
                if (!isNewFarmerInMd && isOldFarmerInMd) {
                  setTimeout(() => {
                    editMdDetail({
                      editedData: {
                        ...oldMd,
                        representativeOf: [...representativeOfOldFarmer],
                      },
                      successCb: () => {
                        Toast({ message: "Representative Updated Successfully.", type: "success" });
                      },
                      errorCb: () => {
                        Toast({ message: "Updating Md request failed! Please try again.", type: "error" });
                      },
                    });
                  }, 0);
                }
              },
              errorCb: () => Toast({ message: "Updating farmer request failed! Please try again.", type: "error" }),
            });
          }, 0);
        },
        errorCb: () => Toast({ message: "Updating farmer request failed! Please try again.", type: "error" }),
      });
    }
    if (newId && !oldId) {
      editFarmer({
        editedData: {
          ...newFarmer,
          representativeOf: [...newFarmer.representativeOf, representativeOfNewFarmer],
        },
        successCb: () => {
          !isNewFarmerInMd && Toast({ message: "Representative Updated Successfully.", type: "success" });
          setTimeout(() => {
            isNewFarmerInMd &&
              editMdDetail({
                editedData: {
                  ...newMd,
                  representativeOf: [...newMd.representativeOf, representativeOfNewFarmer],
                },
                successCb: () => {
                  Toast({ message: "Representative Updated Successfully.", type: "success" });
                },
                errorCb: () => {
                  Toast({ message: "Updating Md request failed! Please try again.", type: "error" });
                },
              });
          }, 0);
        },
        errorCb: () => Toast({ message: "Updating farmer request failed! Please try again.", type: "error" }),
      });
    }
    if (!newId && oldId) {
      editFarmer({
        editedData: {
          ...oldFarmer,
          representativeOf: [...representativeOfOldFarmer],
        },
        successCb: () => {
          !isOldFarmerInMd && Toast({ message: "Representative Updated Successfully.", type: "success" });
          setTimeout(() => {
            isOldFarmerInMd &&
              editMdDetail({
                editedData: {
                  ...oldMd,
                  representativeOf: [...representativeOfOldFarmer],
                },
                successCb: () => {
                  Toast({ message: "Representative Updated Successfully.", type: "success" });
                },
                errorCb: () => {
                  Toast({ message: "Updating Md request failed! Please try again.", type: "error" });
                },
              });
          }, 0);
        },
        errorCb: () => Toast({ message: "Updating farmer request failed! Please try again.", type: "error" }),
      });
    }
  };

  // to print farmer detail form
  useEffect(() => {
    if (farmerIdtoPrint !== null || undefined) {
      generateFarmerDetailForm();
    }
    setFarmerIdtoPrint(null);
  }, [farmerIdtoPrint]);

  // to print credential certificate
  useEffect(() => {
    if (farmerData.id !== null && farmerData.password !== null) {
      credentialCertificateHandler();
    }
  }, [farmerData]);

  useEffect(() => {
    setFarmerBankDetail(false);
  }, []);

  return (
    <>
      <tr>
        <td style={{ display: "none" }}>
          <IdCardBody ref={idCardRef} />
          {farmerIdtoPrint && <FarmerDetailsForm ref={farmerDetailFormRef} farmerIdtoPrint={farmerIdtoPrint} />}
          {farmerData.id !== null && farmerData.password !== null && (
            <CredentialsCertificate ref={credentialCertificate as Ref<HTMLDivElement> | undefined} farmerDatatoPrint={farmerData} />
          )}
        </td>
      </tr>
      <TableRow key={user.id} onClick={() => NavigateToFarmerDetailForm(user.id)}>
        <S.RowCheckCell
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Checkbox onChange={() => checkboxSelect(user.id)} checked={selectedFarmers.includes(user.id)} />
        </S.RowCheckCell>
        <S.WebTableCell>{user.membershipId.substring(0, 15)}</S.WebTableCell>
        {/* for tablet view*/}
        <S.TabCell onClick={(e) => e.stopPropagation()}>
          <Checkbox onChange={() => checkboxSelect(user.id)} checked={selectedFarmers.includes(user.id)} />
          <Stack>
            <CS.Icon onClick={iconModalHandler}>three-dots</CS.Icon>
          </Stack>
        </S.TabCell>
        <S.Cell title="பெயர்">
          <S.NameStack>
            <S.AvatarBox
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {image && <ImagePreview image={image} setImage={setImage} handleCroppedImage={handleCroppedImage} />}
              <S.AvatarImg alt="User-img" src={getURL(user) ? getURL(user) : placeHolderImg} />
              <S.EditBox
                onClick={(e) => {
                  e.stopPropagation();
                  handleIconClick();
                }}
              >
                <S.EditIcon>edit</S.EditIcon>
                <S.HiddenInput type="file" accept="image/png, image/jpeg" ref={hiddenFileInput} onChange={handleInputChange} onClick={onInputClick} />
              </S.EditBox>
            </S.AvatarBox>
            {user.name}
          </S.NameStack>
        </S.Cell>
        <S.Cell title="உறுப்பினர் எண்">{user.membershipId.substring(0, 15)}</S.Cell>
        <S.Cell title="பிறந்த தேதி">{user.dob}</S.Cell>
        <S.Cell title="கைபேசி எண்">{user.phoneNumber}</S.Cell>
        <S.Cell title="குழு பெயர்">{user.group}</S.Cell>
        <S.WebTableCell onClick={(e) => e.stopPropagation()}>
          <S.IconBox>
            <CS.Icon onClick={deleteModalHandler}>delete</CS.Icon>
            <CS.Icon onClick={idCardhandler}>id-card</CS.Icon>
            <CS.Icon onClick={editFarmerDetailHandler}>edit</CS.Icon>
            <CS.Icon
              onClick={() => {
                if (user.pin) {
                  setFormSelectionModal(!formSelectionModal);
                } else {
                  setFarmerIdtoPrint(user.id);
                  setFarmerBankDetail(true);
                }
              }}
            >
              download
            </CS.Icon>
          </S.IconBox>
          <FarmersDetailsIconModal
            open={iconModal}
            handleClose={() => setIconModal(false)}
            handleDelete={() => setDeleteModal(true)}
            handleEdit={() => setEditMode(true)}
            handleIdCard={() => setIdCard(true)}
            handlePdfDownload={() => {
              setFarmerBankDetail(true);
              setFarmerIdtoPrint(user.id);
            }}
          />
          <FarmersDetailsModal
            openModal={editMode}
            handleClose={() => {
              setFarmerBankDetail(false);
              setEditMode(false);
            }}
            cb={updateFarmerDetail}
            editMode={editMode}
            id={user.id}
            mdId={Object.values(isSuccess && (mdDetailsById as IMdDetails[])).find((data) => data.farmerId === user.id)?.id}
          />
          <IdCardModal cardData={user} openModal={idCard} handleClose={idCardhandler} />
          <DeleteModal
            openModal={deleteModal}
            handleClose={() => setDeleteModal(false)}
            handleDelete={async () => {
              if (user.profile) {
                const deleteRes = await deleteProfile(extractProfileName(user.profile), s3ConfigTypes.farmer);
                if (!deleteRes) {
                  Toast({ message: "Request failed, please try again.", type: "error" });
                  setDeleteModal(false);
                  return;
                }
              }
              const isFarmerInMd = Object.values(isSuccess && (mdDetailsById as IMdDetails[])).find((data) => data.farmerId === user.id)?.id;
              !isFarmerInMd &&
                farmerDelete({
                  id: user.id,
                  successCb: () => {
                    Toast({ message: "Farmer Deleted Successfully", type: "success" });
                    removeGroupMember(user.id, user.group, false);
                    addNotification({
                      id: `delete${user.id}`,
                      image: user.profile ? user.profile : placeHolderImg,
                      message: Message(user.name).deleteFarmDetail,
                    });
                  },
                  errorCb: () => Toast({ message: "Request failed! Please try again", type: "error" }),
                });
              isFarmerInMd &&
                farmerDelete({
                  id: user.id,
                  successCb: () => {
                    mdDelete({
                      id: isFarmerInMd,
                      successCb: async () => {
                        removeGroupMember(user.id, user.group, false);
                        Toast({ message: "Farmer Deleted Successfully", type: "success" });
                        addNotification({
                          id: `delete${user.id}`,
                          image: user.profile ? user.profile : placeHolderImg,
                          message: Message(user.name).deleteFarmDetail,
                        });
                      },
                      errorCb: () => Toast({ message: "Request failed! Please try again", type: "error" }),
                    });
                  },
                });
              setDeleteModal(false);
              setIconModal(false);
            }}
            deleteMessage={
              <>
                Do you want to remove <CS.Bold>{user.name}</CS.Bold> from Farmers Details?
              </>
            }
          />
          <ConfirmationModal
            openModal={confirmModal}
            handleClose={() => setConfirmModal(false)}
            yesAction={async () => {
              let profile = editData?.profile;
              if (typeof profile !== "string") {
                const deleteRes = await deleteProfile(extractProfileName(user.profile), s3ConfigTypes.farmer);
                profile = await uploadProfile(editData?.profile, s3ConfigTypes.farmer);
                if ((user.profile && !deleteRes) || !profile) {
                  Toast({ message: "Request failed, please try again.", type: "error" });
                  setConfirmModal(false);
                  return;
                }
              }

              const isFarmerInMd = Object.values(isSuccess && (mdDetailsById as IMdDetails[])).find((data) => data.farmerId === user.id)?.id;
              const farmerEditData = { ...editData, id: editData?.farmerId, profile };
              const newId = editData?.representative?.id ?? "";
              const oldId = editData?.farmerId ? isFarmerDetailsSuccess && farmersDetailsById[editData.farmerId]?.representative?.id : "";
              delete farmerEditData.farmerId;
              loader({ openLoader: true, loaderText: `Updating customer` });
              editCustomer(farmerEditData as farmerDetail).then((res) => {
                if (res && farmerEditData) {
                  !isFarmerInMd &&
                    editFarmer({
                      editedData: farmerEditData,
                      successCb: async () => {
                        editData && removeGroupMember(user.id, editData.group, true);
                        !newId && !oldId && Toast({ message: "Farmer Edited Successfully", type: "success" });
                        if (farmerEditData && oldId !== newId) {
                          setTimeout(() => {
                            HandleRepresentativeOf(farmerEditData as farmerDetail, oldId, newId);
                          }, 0);
                        }
                      },
                      errorCb: () => Toast({ message: "Updating farmer request failed! Please try again", type: "error" }),
                    });
                  isFarmerInMd &&
                    editFarmer({
                      editedData: farmerEditData,
                      successCb: () => {
                        editMdDetail({
                          editedData: editData,
                          successCb: () => {
                            editData && removeGroupMember(user.id, editData.group, true);
                            !newId && !oldId && Toast({ message: "Farmer Edited Successfully", type: "success" });
                            if (farmerEditData && oldId !== newId) {
                              setTimeout(() => {
                                HandleRepresentativeOf(farmerEditData as farmerDetail, oldId, newId);
                              }, 0);
                            }
                          },
                          errorCb: () => Toast({ message: "Updating Md request failed! Please try again", type: "error" }),
                        });
                      },
                      errorCb: () => Toast({ message: "Updating farmer request failed! Please try again", type: "error" }),
                    });
                } else {
                  Toast({ message: "Customer Updation failed! Please try again", type: "error" });
                  loader({ openLoader: false });
                }
              });

              setEditMode(false);
              setConfirmModal(false);
              setIconModal(false);
            }}
          />
          {openFarmerRowModal && (
            <>
              <FarmerBankDetailModal
                openModal={true}
                navigateId={openFarmerRowModal}
                handleClose={() => {
                  setOpenFarmerRowModal(null);
                }}
              />
            </>
          )}
          {formSelectionModal && (
            <>
              <FormSelectionModal
                openModal={true}
                handleClose={() => {
                  setFormSelectionModal(!formSelectionModal);
                }}
                farmerId={user.id}
                cb={() => {
                  setOpenPasswordModal(!openPasswordModal);
                }}
              />
            </>
          )}
          <PasswordModal
            openModal={openPasswordModal}
            handleClose={() => {
              setOpenPasswordModal(false);
            }}
            cb={(data: string) => {
              setFarmerData({ id: user.id, password: data });
            }}
          />
        </S.WebTableCell>
      </TableRow>
    </>
  );
};

export default FarmersDetailsRow;
