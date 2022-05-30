/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import axios from "axios";
import { Button, TextInput, View, TouchableOpacity, StyleSheet, ScrollView, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from "moment";

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listReport: [],
            is_mounted: false,
            incidentObject: [],
            reportStatus: [],
            reportType: []

        };
    }

    getList = async () => {
        const filter = {
            page: 1,
        }

        if (this.state.startDate != '' && this.state.endDate != '') {
            filter['reportTime'] = this.state.startDate + ', ' + this.state.endDate;
        }

        axios.post('https://qlsc.maysoft.io/server/api/getAllReports', filter, {
            headers: {
                'Authorization': this.props.isToken,
            }
        }).then(response => {
            //console.log(response.data.data.data);
            if (this.state.is_mounted) {
                this.setState({
                    listReport: response.data.data.data,
                });
            }
            //console.log(this.state.listReport);
        }).catch(error => {
            console.log(error);
        })
    };

    getListCommon = async () => {
        axios.post('https://qlsc.maysoft.io/server/api/getCommon', { groups: 'incidentObject, reportStatus, reportType' }, {
            headers: {
                'Authorization': this.props.isToken,
            }
        }).then(response => {
            //console.log(response.data.data.data);
            if (this.state.is_mounted) {
                this.setState({
                    incidentObject: response.data.data.incidentObject,
                    reportStatus: response.data.data.reportStatus,
                    reportType: response.data.data.reportType
                });
            }
            /* console.log(this.state.incidentObject);
            console.log(this.state.reportType); */
            //console.log(response.data.data.incidentObject);
            //console.log(response.data.data.reportStatus);
            //console.log(response.data.data.reportType);
        }).catch(error => {
            console.log(error);
        })
    };

    componentDidMount() {
        this.setState({ is_mounted: true });
        this.getList();
        this.getListCommon();
        this.myTimer = setInterval(() => {
            if (this.props.startDate != this.props.endDate) {
                this.handleFiler();
            }
        }, 1000);
        //this.handleFiler();
    }

    clearInterval = () => {
        clearInterval(this.myTimer);
    }
    componentWillUnmount() {
        this.setState({ is_mounted: false });
    }

    handleFiler = () => {
        console.log(this.props.startDate);
        //console.log(this.state.listReport.reportTime);
        if (this.props.startDate > 0 && this.props.endDate > 0) {
            const arr = this.state.listReport.filter((_listReport) =>
                (_listReport.reportTime * 1000 >= this.props.startDate && _listReport.reportTime * 1000 <= this.props.endDate)
            );

            this.setState({
                listReport: arr
            })
        }

    }

    render() {
        /* console.log(this.props.isToken); */
        //console.log(this.props.startDate);

        var listReport_data = "";

        listReport_data = this.state.listReport.map((item) => {
            return (
                <View style={styles.container}  key={item.id}>
                    <View style={styles.containerTitle}>
                        <Text style={styles.textTitle}
                        >{item.reportNo}</Text>
                        <Text style={styles.textStatus}>
                            {item.status == "0" ? 'Phân tích' : 'Mới'}
                        </Text>

                    </View>
                    <Text style={styles.textTime}
                    >{ moment(new Date(item.reportTime * 1000)).format('MM/DD/YYYY hh:MM') }</Text>
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
                    >{item.detailDescription}</Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleFiler.bind(this)}
                    >
                        <Text></Text>
                    </TouchableOpacity>
                </View>
            );
        });
        return (
            <ScrollView>
                {listReport_data}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    container: {
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
    icon: {
        marginRight: 30,
        fontSize: 30,
        color: '#5ca6ff'
    }
})

export default Item;