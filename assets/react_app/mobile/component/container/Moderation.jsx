
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createComment } from "../../services/commentService";
import CommentDisplay from '../CommentDisplay';
import FormComment from '../FormComment';
import TokenHandler from '../../services/security/TokenManager';

const ContainerModeration = ({ resource,
    openContentsResource, openConfirm,
    setOpenContentsResource,
    handleModerate }
) => {
    const id = resource.id

    return (


        <View style={styles.containerModeration}>

            <Text>
                Moderation container
            </Text>

            <View>
                <Text>{resource.title} </Text>
                <Text>{resource.type.label} </Text>
            </View>

            {/* View content of the article */}
            <View>
                <TouchableOpacity
                    onPress={() => setOpenContentsResource(!openContentsResource)}
                    style={styles.btnForDelete}
                >
                    <Text style={styles.loginText}>View content</Text>
                </TouchableOpacity>

            </View>

            {openContentsResource && openConfirm &&
                resource.content && resource.content.length > 0 &&
                <View>
                    {resource.content.map((cont) => [
                        <View>
                            {cont.attribute && cont.attribute.label && <Text styles={styles.attributeLabel}> {cont.attribute.label}  :  </Text>}
                            <Text styles={styles.textValue}> {cont.textValue}</Text>
                        </View>
                    ])}

                </View>

            }

            <View style={styles.manageResource}>
                {/* Delete button */}
                <View style={styles.espace}>
                    <TouchableOpacity
                        onPress={() => handleModerate(id, false)}
                        // style={styles.btnIsNotValidated}
                        style={styles.btnForDelete}
                    >
                        <Text style={styles.txtButton}>Refusé</Text>
                    </TouchableOpacity>
                </View>

                {/* Validation button */}
                <View style={styles.espace}>
                    <TouchableOpacity
                        onPress={() => handleModerate(id, true)}
                        // style={styles.btnIsValidated}
                        style={styles.btnForDelete}

                    >
                        <Text style={styles.txtButton}>Validation</Text>
                    </TouchableOpacity>
                </View>


            </View>


        </View >
    )

}

export default ContainerModeration

const styles = StyleSheet.create({
    main: { flex: 1, margin: 40, borderRadius: 10, flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#FFF', backgroundColor: '#FFF' },
    row: { flex: 1, margin: 40, borderRadius: 10, flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#FFF', backgroundColor: '#FFF' },

    attributeLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'left',
    },

    containerModeration: {
        // flex: 1, 
        margin: 40,
        borderRadius: 10,
        flexDirection: 'column',
        // display:"flex",
        display: 'flex',

        alignItems: 'center',
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: '#FFF'
    },

    manageResource: {
        // flex: 1, 
        // margin: 40,
        borderRadius: 10,
        flexDirection: "row",

        // display:"flex",
        display: 'flex',

        // alignItems: 'center',
        // textAlign: 'center',
        color: '#FFF',
        backgroundColor: '#FFF'
    },

    btnIsNotValidated: {
        width: 60,
        // position: "absolute",
        // top: 10,
        // left: 15,
        // borderRadius: 25,
        height: 50,
        // alignItems: "flex-start",
        // justifyContent: "center",
        // marginTop: 40,
        backgroundColor: "#97161b",
    },

    btnIsValidated: {
        width: 60,
        // position: "absolute",
        // top: 10,
        // right: 15,
        borderRadius: 25,
        height: 50,
        // alignItems: "center",
        // justifyContent: "center",
        // marginTop: 40,
        backgroundColor: "#4b6113",
    },


    btnForDelete: {
        // width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 40,
        backgroundColor: "#FFA831",
    },




    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    txtButton: {
        textAlign: 'center',
        fontSize: 8

    },

    textValue: {
        fontSize: 13,
        padding: 5,
    },

    topLeft: {
        position: "absolute",
        top: 10,
        left: 15,
        textAlign: 'left',

    },
    favoriteButton: {
        position: "absolute",
        top: 10,
        right: 15,
        textAlign: 'right'
    },

    categoryLabel: {
        top: 10,
        left: 0,
        textAlign: 'left',

    },

    titleArticle: {
        fontSize: 'larger',
        marginTop: 13,

    },



    btnForDelete: {
        // width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 40,
        backgroundColor: "#FFA831",
    },

    btnViewContent: {
        // width: "80%",
        borderRadius: 25,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 40,
        backgroundColor: "#FFA831",
    },
})
