import React, { FC } from "react"
import {  TextStyle, View, ViewStyle,ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  AutoImage as Image,
} from "../../components"
import { NavigatorParamList } from "../../navigators"
import { color, spacing} from "../../theme"
const logo = require("./logo.png")


const FULL: ViewStyle = { flex: 1 ,backgroundColor:"#D9E4FA"}
const CONTAINER: ViewStyle = {
  // backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}

const HEADERT:ViewStyle={
  display:"flex",
  flexDirection :"row",
  alignItems:"center",
  
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  // backgroundColor: color.palette.deepPurple,
  backgroundColor:"#79B7D7"
  // // bottom:spacing[30]
  // marginTop:"auto"
  
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  height:24,
  width:24
  
}
const BOTTON :ViewStyle ={
  display:"flex",
  justifyContent:"flex-end"
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: 0,
}

const HEADERTEXT:TextStyle ={
  marginRight:14,
  fontWeight:"bold",
  color:"black",
  fontSize: 20
}

const DESCRIPTION:TextStyle ={
  color:"#959595",
  fontSize:16,
  
}

const AMOUNT :ViewStyle ={
  flexDirection:"row",
  alignItems:"center",
  marginTop:10,
  marginBottom:10
}

const AMOUNT_BALANCE:TextStyle ={
  fontSize:16,
  color: "#959595",
  marginRight:4
}

const AMOUNT_NUMBER : TextStyle ={
  fontSize:16,
  color:"#101010"
}

const CARD:ViewStyle={
  height:430,
  borderRadius:12,
  backgroundColor:"#F6F9FE",
  marginBottom:16,
}

const BALANCE:TextStyle ={
  color:"#77B4D5",
  fontWeight:"bold",
  fontSize:30,
  textAlign:"center",
  marginVertical:14
}

const BALANCE_TEXT:TextStyle ={
  color:"#8496A1",
  textAlign:"center"
}

export const FixedMaturityScreen: FC<StackScreenProps<NavigatorParamList, "fixedMaturity">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()
    
    
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View testID="DemoScreen" style={FULL}>
    {/* <GradientBackground colors={["#d3edf5"]} /> */}
    <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
      <Header
        leftIcon="back"
        onLeftPress={goBack}
        style={HEADER}
      
      />
      
      <View style={HEADERT}>
        <>
        <Text style={HEADERTEXT}>Open Fixed Maturity P2P Plan</Text>
        <Image source={logo} style={BOWSER} />
        </>
      </View>
      <View>
        <Text style={DESCRIPTION}>Please choose the investment amount and tenure for this particular FMPP.</Text>
      </View>
      <View style={AMOUNT}>
        <Text style={AMOUNT_BALANCE}>
          Available Balance:
        </Text>
        <Text style={AMOUNT_NUMBER}>
        {"\u20B9"} 50,000
        </Text>
      </View>
      <View style={CARD}>
        <View >
          <Text style={BALANCE}>
          {"\u20B9"} 50,450
          </Text>
          <Text style={BALANCE_TEXT}>
            Expected return @ 10% p.a. (10.21% yield)
          </Text>
        </View>
      </View>
    
      <Button
        style={DEMO}
        textStyle={DEMO_TEXT}
        tx="fixedMaturityScreen.buttonTitle"
        onPress={() => navigation.navigate("demoList")}
      />

     
     
    </Screen>
  </View>
  )
})
