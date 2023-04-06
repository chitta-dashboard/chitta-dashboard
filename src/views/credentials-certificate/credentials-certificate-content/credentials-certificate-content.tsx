import { FC } from "react";
import { S } from "./credentials-certificate.styled";
import chittaLogo from "../../../assets/images/clean-gradient.png";
import { farmerDetail } from "../../../utils/context/farmersDetails";
import { getPin } from "../../../services/algorand";

interface Props {
  user: farmerDetail;
  farmerDatatoPrint: { id: string | null; password: string | null };
}

const CredentialsContainerContent: FC<Props> = (props) => {
  //constants
  const { user, farmerDatatoPrint } = props;
  
  return (
    <S.CredentialsContainerContent>
      <S.CertificateHeader>
        <S.HeaderText>இந்த பதிவை கவனமாக படிக்கவும்</S.HeaderText>
        <S.LogoContainer>
          <S.ChittaLogo src={chittaLogo} alt="Chitta-logo" />
          <S.HeaderText>சிட்டா</S.HeaderText>
        </S.LogoContainer>
      </S.CertificateHeader>
      <S.UserCredentials>
        <S.CredentialText>
          வணக்கம் <S.UserName>{user.name}</S.UserName>,
        </S.CredentialText>
        <S.CredentialTextBold> நீங்கள், டிஜிட்டல் சிட்டா வாலட்டின் உரிமையாளராகியதற்கு வாழ்த்துக்கள். </S.CredentialTextBold>
        <S.CredentialTextBold>
          ரகசிய குறியீடு :{getPin(user.pin, farmerDatatoPrint.password)}
          <u>யாருடனும் பகிர வேண்டாம்</u>
        </S.CredentialTextBold>
        <S.CredentialRow>
          <S.CredentialTextBold>பப்ளிக் கீ :</S.CredentialTextBold>
          <S.CredentialTextBold>{user.PK}</S.CredentialTextBold>
        </S.CredentialRow>
        <S.CredentialTextBold>நீங்கள் டிஜிட்டல் வாலட்டில் என்ன செய்ய முடியும்?</S.CredentialTextBold>
      </S.UserCredentials>
      <S.DisclaimerContainer>
        <S.DisclaimerText>
          இந்த வால்ட், இலவச டிஜிட்டல் வங்கி கணக்கை போன்றது. சிட்டா பாட்(Chitta Bot) என்பதன் மூலம் வாட்ஸாப்(Whatsapp) செயலியில் பயன்படுத்தலாம்.சிட்டா
          உரையாடல் பகுதியில் <u>உதவி(HELP)</u> என்று டைப் செய்து, அதன் சிறப்பம்சங்களை காணலாம் பயிரிடும் போது அதற்கான வெகுமதியும், முத்திரையும்(label)
          உங்கள் வாலட்டில் சேர்க்கப்படும்.
        </S.DisclaimerText>
        <S.DisclaimerText>உங்களின் புதிய வால்ட் கொண்டு:</S.DisclaimerText>

        <S.DisclaimerList>
          <ul>
            <li>பயிர் காப்பீட்டை பெறலாம்.</li>
            <li>பயிர் கடனை பெறலாம்.</li>
            <li>தேவைக்கேற்ப, முதலீட்டு கடனை பெறலாம்.</li>
            <li>ஒவ்வொரு விளைச்சலின் பயிர் முத்திரையைக்(label) கொண்டு உலகளாவிய விற்பனை செய்யலாம்.</li>
            <li>பயிர் அறுவடைக்கு முன்பே,உங்களால் விற்பனை செய்ய இயலும்.</li>
            <li>CHT என்பது உங்களின் சிட்டா உரிமையாளர் பங்கு ஆகும்.</li>
          </ul>
        </S.DisclaimerList>
        <S.DisclaimerText>
          குறிப்பு : <S.ItalicText>Nerkathir</S.ItalicText> அதிகாரியை தொடர்பு கொண்டு உங்களுக்கான மேற்கண்ட சிறப்பம்சங்களால் பயன் பெறலாம் , அனைத்து
          சிறப்பம்சங்களையும் ஒருவரால் உபயோகிக்க இயலாது.
        </S.DisclaimerText>
        <S.DisclaimerTextBold>உங்களின் வெகுமதியையும், டோக்கனையும் எப்படி பெறலாம்?</S.DisclaimerTextBold>

        <S.DisclaimerText>
          முதலில், நீங்கள் உங்கள் விளை நிலங்களை பதிவு செய்வது அவசியம் பதிவிற்கு பிறகு Nerkathir அதிகாரி உங்களின் விளை நிலங்களின் எல்லைகளை
          சரிபார்ப்பார். அதன் பிறகே, உங்களுக்கான வெகுமதி சில தினங்களில் வழங்கப்படும். வெகுமதியை பெற தாமதமானால் உங்களின் Nerkathir அதிகாரியை தொடர்பு
          கொள்ளலாம்.
          <br />
          எங்களின் செயற்கைக்கோள், புதிய விளைச்சலை உங்கள் விளை நிலங்களில் காணும் ஒவ்வொரு முறையும், ஒரு டோக்கன் உங்களுக்கு வழங்கப்படும்.மொத்த
          டோக்கன்களின் எண்ணிக்கையானது, எங்களின் விளைச்சல் மதிப்பீட்டை பொறுத்தது.
        </S.DisclaimerText>
        <br />
        <S.DisclaimerText>
          வாட்ஸாப்(Whatsapp) செயலியில், சிட்டா பாட்(Chitta Bot) உரையாடல் பகுதியில், <u>ACCOUNT</u> என்று டைப் செய்து உங்களின் வங்கி கணக்கில் உள்ள
          தொகையை காணலாம்.
        </S.DisclaimerText>
      </S.DisclaimerContainer>
    </S.CredentialsContainerContent>
  );
};

export default CredentialsContainerContent;
