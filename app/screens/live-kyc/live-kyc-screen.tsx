import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle ,TextStyle,PermissionsAndroid} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Button, Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import {
  RNHyperSnapSDK,
  RNHyperSnapParams,
  RNHVDocsCapture,
  RNHVFaceCapture,
  RNHVNetworkHelper,
  RNHVQRScanCapture,
} from 'hypersnapsdk_reactnative';

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const TEXT: TextStyle = {
  color: color.palette. black,
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `liveKyc: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="liveKyc" component={LiveKycScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const LiveKycScreen: FC<StackScreenProps<NavigatorParamList, "liveKyc">> = observer(function LiveKycScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  
  useEffect(()=>{
    getPermissions()
    RNHyperSnapSDK.initialize("874244", "51ff32ae6a12c6a42ab3", RNHyperSnapParams.RegionIndia);
    console.log("hello")
  },[])
  
  const getPermissions =async()=>{
   await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO); 
 await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
  }
  
  const onProceedPress =async()=>{
    const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    if (writeGranted) {
        // Start : HyperVerge Flow
        // Start : HyperVerge Face Capture Activity
        hyperVergeFaceCapture();
    }
    else{
        const writeNewGranted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              'title': 'Storage',
              'message': 'This app would like to access your storage.',
              'buttonNegative': 'Cancel',
              'buttonPositive': 'OK'
            }
          );
        if (writeNewGranted === PermissionsAndroid.RESULTS.GRANTED ) {
            // Start : HyperVerge Flow
            // Start : HyperVerge Face Capture Activity
            hyperVergeFaceCapture();
        }
    }
  }
  
  const hyperVergeFaceCapture=()=>{
    try {
      const customHyperVergeEndpoint = 'instamoney/v3/live-kyc/pan';
      const hyperVergeLogger = 'hyperverge-request-logger';
      // const { makePostCall,uploadLoggger, app: { user_id } } = this.props.screenProps;
      // this.setState({showLoader:true});
      // Set user id as transaction id
      const transactionId = "123456"
      RNHyperSnapSDK.startUserSession(`${transactionId}`);
      RNHVFaceCapture.setShouldShowInstructionPage(true);
      RNHVFaceCapture.setLivenessAPIHeaders(`${transactionId}`);
      RNHVFaceCapture.setFaceCaptureTitle("Remove your glasses, click a Selfie.");
      RNHVFaceCapture.setLivenessMode(RNHyperSnapParams.LivenessModeTextureLiveness);
      console.log("hiiii")
      const livenessParams = {
          "allowEyesClosed": "no",
          "rejectBlur": "yes",
          "allowMultipleFaces": "no",
          "rejectFaceMask": "yes"
          };
  
      RNHVFaceCapture.setLivenessAPIParameters(JSON.stringify(livenessParams));
      RNHVFaceCapture.start((faceError, faceResult) => {
          if(faceError != null ){
            console.log('errror')
              // this.setState({showLoader:false});
              // this.setState({hyperVergeTrials:this.state.hyperVergeTrials+1});
              // this.showHyperVergeError(faceError['errorMessage']);
          }
          else{
              // Send Face Capture data to backend 
              // let faceCaptureBody = {
              //     face_capture_result: {},
              // };
              // faceCaptureBody.face_capture_result = faceResult;
              // faceCaptureBody.face_capture_result['transaction_id'] = `${transactionId}`;
              // faceCaptureBody.face_capture_result['number_of_attempts'] = this.state.hyperVergeTrials + 1;
              // let loggerData = {
              //     title: "HyperVerge Face Capture",
              //     content:faceCaptureBody
              // };
              console.log("SUCCESSSSSS",faceResult)
              // uploadLoggger(hyperVergeLogger, loggerData)
  
              // makePostCall(customHyperVergeEndpoint, faceCaptureBody, true, false, true, '', false)
              // .then(json => {
              //     if(json && VALID_RESPONSE_CODES.includes(json.code)){
              //         this.setState({faceResult: faceResult});
              //         // Upload Photograph
              //         this.uploadPhotograph(`file://${faceResult['imageUri']}`, transactionId);
              //     }
              //     else{
              //         this.setState({showLoader:false});
              //         if(json.message){
              //             this.setState({hyperVergeTrials:this.state.hyperVergeTrials+1});
              //             this.showHyperVergeError(json.message);                        
              //         }
              //     }
              // }).catch(e=>{
              //     this.setState({showLoader:false});
              //     this.showHyperVergeError("Something went wrong");
              // });
          }
      });
      
    } catch (error) {
      console.log("error",error)
    }
  }
  const onProceedPressOCR = () => {
    //  Set Optional Parameters
RNHVDocsCapture.setDocCaptureDescription("Place your ID inside the box");
RNHVDocsCapture.setOCRAPIDetails("https://vnm-docs.hyperverge.co/v2/nationalID", RNHyperSnapParams.DocumentFront);

// Create Document Capture Callback
var documentCaptureClosure = (error, result) => {
  if(error != null) {
    // Handle error
  } else {
    // Handle result
    const docImageUri = result["imageUri"] //Document Image
    console.log("imageUri "  +  result["imageUri"])
    console.log("action "  +  result["action"]) //Action = "pass"/"fail"/"manualReview"
    console.log("apiResult "  +  JSON.stringify(result["apiResult"])) //Liveness API Result
    console.log("headers "  +  JSON.stringify(result["apiHeaders"])) //Liveness API Headers
  }
}

// Start Document Capture
RNHVDocsCapture.start(documentCaptureClosure)
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <Text style ={TEXT}preset="header"  text="liveKyc" />
      <Button 
         testID="next-screen-button"
         
         tx="welcomeScreen.continue"
         onPress={onProceedPress}
        />
         <Button 
         testID="next-screen-button"
         
         tx="welcomeScreen.continue"
         onPress={onProceedPressOCR}
        />
    </Screen>
  )
})
