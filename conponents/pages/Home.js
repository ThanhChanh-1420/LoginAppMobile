/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { LogBox, Modal, Pressable, View, TouchableOpacity, StyleSheet, ScrollView, Text, Alert, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Fontisto';
import DatePicker from 'react-native-neat-date-picker';
import Item from './Item';
import axios from "axios";
import moment from "moment";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDatePicker: false,
            setShowDatePicker: false,
            timeStart: '',
            timeEnd: '',
            timeStartDate: '',
            timeEndDate: '',
            modalVisible: false,
            isSelected: false,
            listReport: [],
            is_mounted: false,
            hobbiesName: '',
            hobbiesValue: ''
        };
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    openDatePicker = () => {
        //setShowDatePicker(true)
        this.setState({ showDatePicker: true });
    }

    onCancel = () => {
        // You should close the modal in here
        this.setState({ showDatePicker: false });
        //setShowDatePicker(false)
    }
    // range mode
    onConfirm = (output) => {
        const { startDate, startDateString, endDate, endDateString } = output;
        /* console.log(startDate.getTime());
        console.log(startDateString);
        console.log(endDate.getTime());
        console.log(endDateString); */
        //console.log(startDate.getTime());
        this.setState({
            timeStart: startDateString,
            timeStartDate: startDate.getTime() / 1000,
            timeEnd: endDateString,
            timeEndDate: endDate.getTime() / 1000
        }, () => {
            this.onCancel();
            this.getList();
        });
        //this.setState({ timeStartDate: startDate.getTime()/1000 });
        console.log(this.state.timeStartDate);

        //console.log(endDate.getTime());
        //this.setState({ timeEnd: endDateString });

        //this.setState({ timeEndDate: endDate.getTime()/1000 });
        console.log(this.state.timeEndDate);
        //console.log(endDateString);
        //this.onCancel();
        //this.getList();
    }

    getList = async () => {

        const filter = {
            page: 1,
        }

        if (this.state.timeStartDate && this.state.timeEndDate != '') {
            filter['reportTime'] = this.state.timeStartDate + ', ' + this.state.timeEndDate;
        }

        if (this.state.hobbiesValue != '') {
            filter['status'] = this.state.hobbiesValue;
        }

        console.log(filter);
        axios.post('https://qlsc.maysoft.io/server/api/getAllReports', filter, {
            headers: {
                'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI3IiwianRpIjoiZjhkM2RmZDM3MTY4MDA2OWQ2YjMwMDJiOWRjMWY2MGRkNTcyYjIxNzRjMDE5M2E0NjEzNjk1NzU0ZjMwYmNjMmRiNjEyYmJiZjdhOWI5MjEiLCJpYXQiOjE2MjM2Mzg2ODUsIm5iZiI6MTYyMzYzODY4NSwiZXhwIjoxNjU1MTc0Njg1LCJzdWIiOiJoR2I1R0NUbjJPOWhpWE5tNVdLUSIsInNjb3BlcyI6W119.swb_t5wE60KB613MrDHcqjXDU8Evj595DpAIa7FGNalDOZEfuhuACZxJ-eoHyB_i22EaRD46iWQ1sCImbFLFDXl54ScYKC9LGdjpWeK1j5-SdE0OBCJ4wRRwxCSPk--jT9dSP7NcXmbSL9Z-4BonW0cQ1ZLaF0_MClMFQOo45zWx1SE6pQ_M7IK-IRBJXW4NO0kt-5HS7v0jNzYTZvlkAYUdup9CKPsPQDZxWgNbga6B1bkpwwKhKxz0wCL2FS8Llm4OD1Q832_4w7ur1pY6-lhrX8nxcOrZlc8Mrn99K_CLmgrwHrF6LY5zU7PW0DDTFDJxWwmixJlaud7HrDcH0hUDMTq2zmOzEA7qOUrqvN4bWCI8j3CHZ13auQ0foI-9HtEJR_O-_qjdyBiy5Z3vjR8tmGD0x3qrdBuajgOSn62c_N-jIOhnM1nkwmjE49TK8nz4jyxtVuCdFJvDOMQPZDS4B3fkOWm2z00V3WZcjedvXVEP7wRxMbOGVrQxXyEwy3WfNOzOOrAps0JVsSUhhjOuqrhwdqcLNwpKvNlfph6d8hhMfa5l61M3DjvRgwBl3_Oi8kTdTh8tEf7M-dfuLkKWtWrGPRvAZpYnaxQjpfzuPFSNYKa3gjNXKu58njgwtd46e5AuOuj246rzXvMCyjEw-DzsXWn8GaJJDhyRxkY',
            }
        }).then(response => {
            //console.log(response.data.data);
            if (this.state.is_mounted) {
                this.setState({
                    listReport: response.data.data.data,
                });
            }
            //console.log(this.state.listReport);
        }).catch(error => {
            console.log('adfasf,', error);
        })
    };

    componentDidMount() {
        this.setState({
            is_mounted: true
        }, () => {
            this.getList();
        });
        //this.getList();
    }

    componentWillUnmount() {
        this.setState({ is_mounted: false });
    }

    getReportStatus = (code) => {
        console.log(code);
        this.setState({
            hobbiesValue: code,
            modalVisible: false
        }, () => {
            this.getList();
        });
        //this.getList();
    }


    render() {
        //console.log(this.props.tokenApi);
        const { modalVisible } = this.state;
        LogBox.ignoreLogs(["EventEmitter.removeListener"]);
        var listReport_data = "";

        listReport_data = this.state.listReport.map((item) => {
            return (
                <View style={styles.containerItem} key={item.id}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.textTitle}
                        >{item.reportNo}</Text>
                        <Text style={styles.textStatus}>
                            {item.status == "0" ? 'Phân tích' : 'Mới'}
                        </Text>

                    </View>
                    <Text style={styles.textTime}
                    >{moment(new Date(item.reportTime * 1000)).format('MM/DD/YYYY hh:MM')}</Text>
                    <View style={styles.containerTitle}>
                        <Text style={styles.textND}
                        >Tự nguyện|Trang thiết bị cơ sở hạ tầng</Text>
                        <TouchableOpacity>
                            <Icon name="list-ul" style={styles.icon}></Icon>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.textName}
                    >{item.reporterName} </Text>
                    <Text style={styles.textSDT}
                    >{item.shortDescription}</Text>

                </View>
            );
        });
        return (
            <ScrollView>
                <View style={styles.containerTop}>
                    <View style={styles.containerDate}>
                        <Text
                            style={styles.input}
                            value={'Tìm kiếm'}
                        >
                            {this.state.timeStart + ' - ' + this.state.timeEnd}
                            <TouchableOpacity style={styles.button} onPress={this.openDatePicker.bind(this)}>
                                <Icon2 name="date" style={styles.iconDate}></Icon2>
                            </TouchableOpacity>
                        </Text>
                    </View>

                    <DatePicker
                        isVisible={this.state.showDatePicker}
                        mode={'range'}
                        onCancel={this.onCancel.bind(this)}
                        onConfirm={this.onConfirm.bind(this)}
                    />

                    <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                        <Icon style={styles.iconFilter} name="filter"></Icon>
                    </TouchableOpacity>
                </View>


                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            this.setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Chọn nội dung cần lọc</Text>

                                <View style={styles.checkboxContainer}>
                                    <TouchableOpacity
                                        style={styles.buttonFilter}
                                        onPress={() => { this.getReportStatus("0") }}
                                    >
                                        <Text style={styles.label}>Mới</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonFilter}
                                        onPress={() => { this.getReportStatus("1") }}
                                    >
                                        <Text style={styles.label}>Phân tích</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonFilter}
                                        onPress={() => { this.getReportStatus("2") }}
                                    >
                                        <Text style={styles.label}>Đang xử lý</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonFilter}
                                        onPress={() => { this.getReportStatus("3") }}
                                    >
                                        <Text style={styles.label}>Đã xử lý</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonFilter}
                                        onPress={() => { this.getReportStatus("4") }}
                                    >
                                        <Text style={styles.label}>Đã hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.buttonFilter}
                                        onPress={() => { this.getReportStatus("5") }}
                                    >
                                        <Text style={styles.label}>Đã đóng</Text>
                                    </TouchableOpacity>
                                </View>

                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => this.setModalVisible(!modalVisible)}
                                >
                                    <Text style={styles.textStyle}>Đóng</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>


                <View style={styles.containerCenter}>
                    {listReport_data}
                </View>
                <View style={styles.containerBottom}>
                    <TouchableOpacity style={styles.touchableOpacity}>
                        <Icon style={styles.icon1} name="book" size={30}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableOpacity}>
                        <Icon style={styles.icon1} name="tv" size={30}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableOpacity}>
                        <Icon style={styles.icon3} name="pie-chart" size={30}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableOpacity}>
                        <Icon style={styles.icon} name="comment" size={30}></Icon>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.touchableOpacity}>
                        <Icon style={styles.icon2} name="user" size={30}></Icon>
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <Text>Danh sách</Text>
                    <Text>Theo dõi</Text>
                    <Text>Biểu đồ</Text>
                    <Text>Thông báo</Text>
                    <Text>Cá nhân</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    containerTop: {
        //paddingTop: 10,
        //marginTop: 10,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    containerCenter: {
        paddingTop: 10,
        //marginTop: 500,
        backgroundColor: '',
        alignItems: 'center',
    },
    containerBottom: {
        paddingTop: 10,
        marginTop: 500,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 350,
        borderRadius: 10,
        borderColor: '#5ca6ff'
    },
    iconFilter: {
        color: '#5ca6ff',
        fontSize: 40,
        marginRight: 7

    },
    icon1: {
        marginLeft: 15
    },
    icon2: {
        marginRight: 10
    },
    icon: {
        marginRight: 15
    },
    iconDate: {
        marginLeft: 290,
        fontSize: 25,
        color: '#5ca6ff',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#2196F3'
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 30,
        textAlign: "center",
        fontWeight: "bold",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    containerItem: {
        backgroundColor: '#fff',
        width: 400,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'red',
        marginBottom: 5
    },
    textTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    textStatus: {
        color: '#faff00',
        marginRight: 280
    },
    textTime: {
        fontSize: 12
    },
    buttonFilter: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'red',
        width: 50,
        marginLeft: 5,
        backgroundColor: '#2196F3'
    },
    label: {
        textAlign: "center",
        color: 'black',
        fontWeight: 'bold',
    }
});

export default Home;