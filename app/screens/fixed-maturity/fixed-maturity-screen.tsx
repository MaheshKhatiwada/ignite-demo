import React, { FC,useMemo,useState } from "react"
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
import {
  BarChart,
} from "react-native-chart-kit";
import Slider from "@react-native-community/slider";

const logo = require("./logo.png")
const scroll = require("./scroll.png")
const star = require("./star.png")




const CHART:ViewStyle ={
  // backgroundColor:"#F6F9FE",
}

const FULL: ViewStyle = { flex: 1 ,backgroundColor:"#D9E4FA"}
const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
}

const HEADERT:ViewStyle={
  marginTop:-10,
  marginBottom:10,
  display:"flex",
  flexDirection :"row",
  alignItems:"center",
  
}
const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor:"#79B7D7",
}
const BOWSER: ImageStyle = {
  alignSelf: "center",
  maxWidth: "100%",
  height:24,
  width:24
  
}
const BOLD: TextStyle = { fontWeight: "bold" }
const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 16,
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
  height:480,
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
const BALANCE_BLACK:TextStyle ={
  color:"black",
  fontWeight:"bold",
  fontSize:30,
  textAlign:"center"
}

const BALANCE_TEXT:TextStyle ={
  color:"#8496A1",
  textAlign:"center"
}

const GRAPHSTYLE:any ={
  marginTop:10,
  paddingRight: 0,
  // backgroundColor:"#0000FF",
  
  
}

const SLIDER:any ={
  height:50,
  with:300,
  
}

const STAR:any ={
  height:25,
  width:25,
  position:"absolute",
  right:29,
  top:120,
  zIndex:999,
}

const defaultColor=`#DBDBDB`;
const changedColor= `#79B7D7`

function getColor(selected:boolean) {
        return selected ? changedColor : defaultColor;
}

export const FixedMaturityScreen: FC<StackScreenProps<NavigatorParamList, "fixedMaturity">> = observer(
  ({ navigation }) => {
    const [value, setValue] = useState(1000);
    const [index,setIndex]=useState(1)
    const goBack = () => navigation.goBack()
    
    const data = useMemo(() => {
      return{
      labels: ["1Y", "2Y", "3Y", "4Y", "5Y"],
      datasets: [
        {
          data: [5.00, 10, 15, 16, 18],
          colors:[
            () => getColor(index === 0) ,
            () => getColor(index === 1),
            () => getColor(index === 2),
            () => getColor(index === 3),
            () => getColor(index === 4),
            
          ]  
        }
      ],
    
    }}, [index]);
    
    
const chartConfig = {

  backgroundColor:"#F6F9FE",
  backgroundGradientTo: "#F6F9FE",
  backgroundGradientFromOpacity: 0,
  backgroundGradientFrom: "#F6F9FE",
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgb(121, 121, 121, ${opacity})`,
  barRadius:5,
  // formatXLabel: (value) => `${value}%`,
  formatTopBarValue:(value)=>`${value}%`,
  // paddingTop:10,
  // padding:100,
  // marginLeft:40,
  borderBottomColor:"#FF0000",
  propsForVerticalLabels:{
  
    fontSize: 30,
    // margin:50,
    border:"1px solid red",
    
    // stroke:"#00FF00",
  //   stroke?: Color;
  // disabled:false,
  // strokeLinecap:"square",
  // strokeWidth: 2,
  // strokeOpacity?: NumberProp;
  // strokeDasharray?: ReadonlyArray<NumberProp> | NumberProp;
  // strokeDashoffset?: NumberProp;
  // strokeLinecap?: Linecap;
  // strokeLinejoin?: Linejoin;
  // strokeMiterlimit?: NumberProp;
    // backgroundColor:"#FF0000",
    // strokeLinejoin:"round",
    // marker:"Hello",
    // hitSlop:{top: 100, bottom: 20, left: 50, right: 50}
    
    onPress:(value)=>{
      setIndex(value?._targetInst?._debugOwner?.index)
      
    },  
    
   
    // fill:"#FF0000",
    
   
    
  },
  
  
};
    
  return (
    <View testID="DemoScreen" style={FULL}>
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
      <Text>{index}</Text>
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
        <Image source={star} style={STAR}/>
        <View style={CHART}>
        <BarChart
            style={GRAPHSTYLE}
            data={data}
            width={360}
            height={270}
            yAxisLabel=""
            chartConfig={chartConfig}
            withHorizontalLabels={false}
            yAxisSuffix =""
            showValuesOnTopOfBars={true}
            showBarTops={false}
            fromZero
            withInnerLines={false}
            withCustomBarColorFromData={true}
            flatColor={true}   
            
            // renderDecorator={}
            
/>
        </View>
        <View>
          <Text style={BALANCE_BLACK}>
          {"\u20B9"} {value}
          </Text>
          <Text style={BALANCE_TEXT}>
            Investment Amount
          </Text>
          
          <Slider
           style={SLIDER}
           thumbTintColor="#79B7D7"
           step={500}
           minimumValue={1000}
           maximumValue={100000}
           minimumTrackTintColor="#3498db"
           maximumTrackTintColor="#3498db"
           thumbImage={scroll}
           onValueChange={(val) =>setValue(val)}
          //  thumbStyle={}
          // thumbSize={20}
         />
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
