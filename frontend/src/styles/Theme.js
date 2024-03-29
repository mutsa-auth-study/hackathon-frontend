// 테마를 미리 정해놓아서 써야합니다.
// 최소한 폰트 사이즈랑 색은 맞춰서
const fontSizes = {
  logo: "50px",
  navigation: "23px",
  title: "40px",
  subtitle: "32px",
  button: "16px",
  calendarEvent: "8px",
  paragraph: "24px",
  search: "16px",
  locationName: "18px",
  locationAddress: "15px",
  tab: "36px",
  tabtitle: "30px",
  examdesc: "16px",
  writedesc: "20px",
  modalTitle: "16px",
  tooltip: "14px",
  examDetail: "28px",
}

const colors = {
  primaryColor: "#2090FF",
  primaryColor300: "#60b1ff",
  primaryColor200: "#8FC7FF",
  primaryColor100: "#BBDCFF",
  primaryColor50: "#e3f1ff",
  secondaryColor: "#FF9020",
  secondaryColor500: "#FFC027",
  secondaryColor300: "#ffd458",
  secondaryColor200: "#FFDF87",
  secondaryColor100: "#ffecb6",
  grayBorder: "#DEE2E6",
  grayParagraph: "#7E7E7E",
  grayDesc: "#68717A",
  white: "#ffffff",
  black: "#000000",
}

const priorityColor = {
  primary: {
    first: colors.primaryColor,
    second: colors.primaryColor300,
    third: colors.primaryColor200,
    fourth: colors.primaryColor100,
    fifth: colors.primaryColor50,
  },
  secondary: {
    first: colors.secondaryColor,
    second: colors.secondaryColor500,
    third: colors.secondaryColor300,
    fourth: colors.secondaryColor200,
    fifth: colors.secondaryColor100,
  },
}

const componentSize = {
  maxWidth: "1920px",
}

const theme = {
  fontSizes,
  colors,
  componentSize,
  priorityColor,
}

export default theme
