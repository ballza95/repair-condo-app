import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Button,
    Dimensions,
    AsyncStorage,
    Alert,
    ImageBackground,
    KeyboardAvoidingView,
    BackHandler
} from 'react-native';
const { height, width } = Dimensions.get('window')
import * as firebase from "firebase";
import "firebase/firestore";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default class RegisterScreen extends React.Component {
    static navigationOptions = {

    };

    constructor(props) {
        super(props);
        this.state = {
            headName: '',
            date: "",
            formatDate: null,
            ErrorLastname: null,
            ErrorFullname: null,
            ErrorPassword: null,
            ErrorEmail: null,
            ErrorTel: null,
            ErrorNoRoom: null,
            ErrorFloor: null,
            TextInputLastname: '',
            TextInputFullname: '',
            TextInputEmail: '',
            TextInputPassword: '',
            TextInputTel: '',
            TextInputNoRoom: '',
            TextInputFloor: '',
        }

    }

    onEnterTextEmail = (TextInputValue) => {
        if (TextInputValue.trim() != 0) {
            this.setState({ TextInputEmail: TextInputValue, ErrorEmail: true });
        } else {
            this.setState({ TextInputEmail: TextInputValue, ErrorEmail: false });
        }
    }

    onEnterTextPassword = (TextInputValue) => {
        if (TextInputValue.trim() != 0) {
            this.setState({ TextInputPassword: TextInputValue, ErrorPassword: true });
        } else {
            this.setState({ TextInputPassword: TextInputValue, ErrorPassword: false });
        }
    }


    onEnterTextFirstname = (TextInputValue) => {
        if (TextInputValue.trim() != 0) {
            this.setState({ TextInputFullname: TextInputValue, ErrorFullname: true });
        } else {
            this.setState({ TextInputFullname: TextInputValue, ErrorFullname: false });
        }
    }

    onEnterTextLastname = (TextInputValue) => {
        if (TextInputValue.trim() != 0) {
            this.setState({ TextInputLastname: TextInputValue, ErrorLastname: true });
        } else {
            this.setState({ TextInputLastname: TextInputValue, ErrorLastname: false });
        }
    } 

    onEnterTextTel = (TextInputValue) => {
        if (TextInputValue.trim() != 0) {
            this.setState({ TextInputTel: TextInputValue, ErrorTel: true });
        } else {
            this.setState({ TextInputTel: TextInputValue, ErrorTel: false });
        }
    }

    onEnterTextNoRoom = (TextInputValue) => {
        if (TextInputValue.trim() != 0) {
            this.setState({ TextInputNoRoom: TextInputValue, ErrorNoRoom: true });
        } else {
            this.setState({ TextInputNoRoom: TextInputValue, ErrorNoRoom: false });
        }
    }

    onEnterTextFloor = (TextInputValue) => {
        if (TextInputValue.trim() != 0) {
            this.setState({ TextInputFloor: TextInputValue, ErrorFloor: true });
        } else {
            this.setState({ TextInputFloor: TextInputValue, ErrorFloor: false });
        }
    }


    checkDataRegister() {
        if (this.state.ErrorFullname == true && this.state.ErrorLastname == true && this.state.ErrorEmail == true && this.state.ErrorPassword == true && this.state.ErrorTel == true && this.state.ErrorNoRoom == true && this.state.ErrorFloor == true) {
            this.onRegister()
        } else if (this.state.TextInputFullname == '') {
            this.setState({ ErrorFullname: false });
        } else if (this.state.TextInputFullname != '') {
            this.setState({ ErrorFullname: true });
        } if (this.state.TextInputLastname == '') {
            this.setState({ ErrorLastname: false });
        } else if (this.state.TextInputLastname != '') {
            this.setState({ ErrorLastname: true });
        } if (this.state.TextInputEmail == '') {
            this.setState({ ErrorEmail: false });
        } else if (this.state.TextInputEmail != '') {
            this.setState({ ErrorEmail: true });
        } if (this.state.TextInputPassword == '') {
            this.setState({ ErrorPassword: false });
        } else if (this.state.TextInputPassword != '') {
            this.setState({ ErrorPassword: true });
        } if (this.state.TextInputNoRoom == '') {
            this.setState({ ErrorNoRoom: false });
        } else if (this.state.TextInputNoRoom != '') {
            this.setState({ ErrorNoRoom: true });
        } if (this.state.TextInputFloor == '') {
            this.setState({ ErrorFloor: false });
        } else if (this.state.TextInputFloor != '') {
            this.setState({ ErrorFloor: true });
        } if (this.state.TextInputTel == '') {
            this.setState({ ErrorTel: false });
        } else if (this.state.TextInputTel != '') {
            this.setState({ ErrorTel: true });
        }
    }

    async onRegister() {
        try {
            await firebase.auth().createUserWithEmailAndPassword(this.state.TextInputEmail, this.state.TextInputPassword).then(
                (res) => {
                    //TODO
                }
            );
            const currentUser = firebase.auth().currentUser;

            const db = firebase.firestore();
            db.collection("users")
                .doc(currentUser.uid)
                .set({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    firstName: this.state.TextInputFullname,
                    lastName: this.state.TextInputLastname,
                    tel: this.state.TextInputTel,
                    roomno: this.state.TextInputNoRoom,
                    floor: this.state.TextInputFloor
                    
                }).then(
                    Alert.alert("???????????????????????????", "????????????????????????????????????????????????????????????"),
                    this.props.navigation.goBack(null)
                )

        } catch (err) {
            Alert.alert("???????????????????????????", err.message);
        }
    }



    render() {

        return (
            <View style={styles.container}>
                 <KeyboardAvoidingView behavior="padding" 
                 keyboardVerticalOffset={30}
                 style={{
                        flex: 1,
                        justifyContent: 'space-between',
                    }}>
                <ScrollView>
                   
                        <View style={{ padding: 40 }}>

                            <View style={{ marginBottom: 20 }}>

                                {this.state.ErrorEmail == false ? (
                                    <Text style={styles.errorMessage}>
                                        ???????????????
                                    </Text>
                                ) : <Text style={styles.headText}>???????????????</Text>}
                                <TextInput
                                    onChangeText={TextInputValue => this.onEnterTextEmail(TextInputValue)}
                                    placeholder={'???????????????????????????'}
                                    style={{ padding: -10, fontFamily: 'sukhumvit-set', }}
                                    underlineColorAndroid={'transparent'}
                                    numberOfLines={1}
                                />

                                <View style={{ height: 1, backgroundColor: '#CED7DE', marginTop: 10, marginBottom: 10 }} />
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                {this.state.ErrorPassword == false ? (
                                    <Text style={styles.errorMessage}>
                                        ????????????????????????
                                    </Text>
                                ) : <Text style={styles.headText}>????????????????????????</Text>}

                                <TextInput
                                    onChangeText={TextInputValue => this.onEnterTextPassword(TextInputValue)}
                                    secureTextEntry={true}
                                    placeholder={'????????????????????????????????????'}
                                    style={{ padding: -10, fontFamily: 'sukhumvit-set', }}
                                    underlineColorAndroid={'transparent'}
                                    numberOfLines={1}
                                />

                                <View style={{ height: 1, backgroundColor: '#CED7DE', marginTop: 10, marginBottom: 10 }} />
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                {this.state.ErrorFullname == false ? (
                                    <Text style={styles.errorMessage}>
                                        ????????????
                                    </Text>
                                ) :
                                    <Text style={styles.headText}>????????????</Text>
                                }

                                <TextInput
                                    onChangeText={TextInputValue => this.onEnterTextFirstname(TextInputValue)}
                                    placeholder={'??????????????????????????????????????????'}
                                    style={{ padding: -10, fontFamily: 'sukhumvit-set', }}
                                    underlineColorAndroid={'transparent'}
                                    numberOfLines={1}
                                />

                                <View style={{ height: 1, backgroundColor: '#CED7DE', marginTop: 10, marginBottom: 10 }} />
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                {this.state.ErrorLastname == false ? (
                                    <Text style={styles.errorMessage}>
                                        ?????????????????????
                                    </Text>
                                ) :
                                    <Text style={styles.headText}>?????????????????????</Text>
                                }

                                <TextInput
                                    onChangeText={TextInputValue => this.onEnterTextLastname(TextInputValue)}
                                    placeholder={'???????????????????????????????????????????????????'}
                                    style={{ padding: -10, fontFamily: 'sukhumvit-set', }}
                                    underlineColorAndroid={'transparent'}
                                    numberOfLines={1}
                                />

                                <View style={{ height: 1, backgroundColor: '#CED7DE', marginTop: 10, marginBottom: 10 }} />
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                {this.state.ErrorLastname == false ? (
                                    <Text style={styles.errorMessage}>
                                        ???????????????????????????????????????
                                    </Text>
                                ) :
                                    <Text style={styles.headText}>???????????????????????????????????????</Text>
                                }

                                <TextInput
                                    onChangeText={TextInputValue => this.onEnterTextTel(TextInputValue)}
                                    placeholder={'?????????????????????????????????????????????????????????????????????'}
                                    style={{ padding: -10, fontFamily: 'sukhumvit-set', }}
                                    underlineColorAndroid={'transparent'}
                                    keyboardType={'number-pad'}
                                    numberOfLines={1}
                                />

                                <View style={{ height: 1, backgroundColor: '#CED7DE', marginTop: 10, marginBottom: 10 }} />
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                {this.state.ErrorNoRoom == false ? (
                                    <Text style={styles.errorMessage}>
                                        ?????????????????????????????????
                                    </Text>
                                ) :
                                    <Text style={styles.headText}>?????????????????????????????????</Text>
                                }

                                <TextInput
                                    onChangeText={TextInputValue => this.onEnterTextNoRoom(TextInputValue)}
                                    placeholder={'???????????????????????????????????????????????????????????????'}
                                    style={{ padding: -10, fontFamily: 'sukhumvit-set', }}
                                    underlineColorAndroid={'transparent'}
                                    keyboardType={'number-pad'}
                                    numberOfLines={1}
                                />

                                <View style={{ height: 1, backgroundColor: '#CED7DE', marginTop: 10, marginBottom: 10 }} />
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                {this.state.ErrorFloor == false ? (
                                    <Text style={styles.errorMessage}>
                                        ????????????
                                    </Text>
                                ) :
                                    <Text style={styles.headText}>????????????</Text>
                                }

                                <TextInput
                                    onChangeText={TextInputValue => this.onEnterTextFloor(TextInputValue)}
                                    placeholder={'??????????????????????????????????????????'}
                                    style={{ padding: -10, fontFamily: 'sukhumvit-set', }}
                                    underlineColorAndroid={'transparent'}
                                    keyboardType={'number-pad'}
                                    numberOfLines={1}
                                />

                                <View style={{ height: 1, backgroundColor: '#CED7DE', marginTop: 10, marginBottom: 10 }} />
                            </View>


                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => this.checkDataRegister()}
                                    style={[styles.button, styles.buttonFacebook]}>
                                    <Text style={styles.buttonText}>?????????????????????????????????</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    
                </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'sukhumvit-set',
    },
    headText2: {
        fontSize: 14,
        color: '#000',
        fontFamily: 'sukhumvit-set',
    },
    button: {
        height: hp('6%'),
        width: width * .6,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    buttonFacebook: {
        backgroundColor: '#3b5998',
    },
    buttonMobile: {
        backgroundColor: '#4CAF50',
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontFamily: 'sukhumvit-set',
    },
    errorMessage: {
        fontSize: 16,
        color: "red",
        fontFamily: 'sukhumvit-set',
    },
});