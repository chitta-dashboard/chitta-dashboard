import {Box,styled} from '@mui/material';

namespace S {
    export const ImageCropperContainer  = styled(Box)(({theme})=>({
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:"rgba(22,22,22,0.2)",
        zIndex: "5",
    }))
    export const ImagePopUp = styled(Box)(({theme})=>({
        margin: "2%",
        padding: "2% 1%",
        boxShadow: "1px 1px 10px #bababa",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "70%",
        height: "70vh",
        backgroundColor: "white",
        position: "relative",
        borderRadius:'0.75rem'
    }))
    export const CloseIconContainer = styled(Box)(({theme})=>({
      position: "absolute",
      top:"1%",
      right:"1%",
      width:'1.3rem',
      height:'1.3em',
      cursor: "pointer",
      backgroundColor:'#C1E1D6',
      borderRadius:'50%',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }))
    export const CloseIcon = styled('i')(({theme})=>({
        color:"white",
        fontSize:'0.7rem'
    }))
    export const MainImageContainer = styled(Box)(({theme})=>({
        width: "80%",
        height: "100%",
        ".react-cropper":{
            width: "100%",
            height:"inherit",
            "div":{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            "img":{
              width: "100%",
              height: "100%"
             }
            }    
        }
    }))
    export const ImageDetailsSection = styled(Box)(({theme})=>({
        width: "20%",
        height: "100%",
        display: "flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        marginLeft:'1rem'
    }));

    export const PreviewTitleContainer = styled(Box)(({theme})=>({
      width:'60%',
      backgroundColor:"#C1E1D6",
      fontSize:'1.3rem'
    }));

    export const PreviewImageContainer = styled(Box)(({theme})=>({
        width: "70%",
        aspectRatio: "1/1",
        border: "1px solid #dbdbdb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin:'5% 0',
        'img':{
          width: "100%",
          height: "100%"
        },
        '.image-preview-title':{
          color:"#bababa"
        }
    }))
    export const UploadBtn = styled(Box)(({theme})=>({
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "2%",
        "button":{
          padding: "10px 20px",
          fontSize: "1rem",
          backgroundColor: "#1A9035",
          color: "white",
          border:"none",
          cursor: "pointer",
          borderRadius:'0.4rem'
        }
    }))
}

export default S;