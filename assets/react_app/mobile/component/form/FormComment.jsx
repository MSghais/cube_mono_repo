
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground, TextInput } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createComment } from "../../services/commentService";
export const KEY_TOKEN = 'token'
export const USER_ID = 'USER_ID'

const FormComment = ({ resource, commentId }) => {


    const token = AsyncStorage.getItem(KEY_TOKEN).then(response => response)
    const USER_ID = AsyncStorage.getItem(USER_ID).then(response => response)

    const [content, setContent] = React.useState('')
    const [comment, setComment] = React.useState({
        // content: content,
        content,
        resource: { value: `/api/resources/${resource.id}` },
        createdAt: { value: new Date() },
        parentComment: { value: "" },
        userEntity: { value: "" },
    })

    let textNoConnected = <Text></Text>
    const handleSubmit = () => {
        console.log('content', content)

        let commentToSend = {
            // content: comment.content.value,
            content: content,

            resource: comment.resource.value,
            createdAt: comment.createdAt.value,
            // userEntity: `api/users/201`,
            userEntity: `api/users/${USER_ID}`,

            parentComment: commentId ? `api/comments/${commentId}` : null
        }

        console.log(commentToSend)
        createComment(commentToSend).then(res => {
            if (res.status === 201) {
                //commentId ? onCloseModal(): null
                // refresh()
                // resetComment()
            }
        })


    }



    return (
        <View style={styles.main}>


            {token &&
                <View
                // style={styles.btn}
                >
                    <Text > Poste ton commentaire</Text>

                    <View
                        style={styles.viewComment}
                    >


                        <View
                            style={styles.inputView}>
                            <TextInput
                                style={styles.TextInput}
                                onChangeText={setContent}
                                value={content}
                                placeholder="What do you want to say ?"
                            // placeholderTextColor="#003f5c"
                            // secureTextEntry={true}
                            // textContentType='password'
                            // style={styles.TextInput}
                            // onSubmitEditing={handlePress}
                            />
                        </View>

                        <View>
                            {textNoConnected}

                        </View>

                        <TouchableOpacity
                            // onPress={handlePress} 
                            onPress={handleSubmit}
                        >
                            <View
                                style={styles.btnSubmit}
                                title="Commenter">
                                Commenter
                            </View>
                        </TouchableOpacity>



                    </View>



                </View>
            }

        </View>


    )
}

const styles = StyleSheet.create({
    main: { flex: 1, margin: 40, borderRadius: 10, flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#FFF', backgroundColor: '#FFF' },
    viewComment: {
        // flex: 1, 
        // margin: 40,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center', textAlign: 'center',
        //    color: '#FFF', backgroundColor: '#FFF' 
    },

    attributeLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    inputView: {
        backgroundColor: "#FF9F1C",
        borderRadius: 5,
        height: 90,
        alignItems: "center",
        opacity: 0.8,
        marginLeft: 20,
    },
    TextInput: {
        height: 90,
        flex: 1,
    },

    textValue: {
        fontSize: 13,
        padding: 5,
    },


    contentDivider: {
        borderWidth: 0.1,
        borderColor: 'black',
        margin: 1,

        color: '#FFF',
    },
    txt: {
        fontSize: 30, marginTop: 20,
        color: '#FFF'
    },
    txt_md: {
        fontSize: 20, marginTop: 5,
        color: '#FFF'
    },
    img: { width: 150, height: 150, marginTop: 20 },
    pan: { borderWidth: 1, borderRadius: 30, borderColor: 'gray', padding: 10, marginTop: 5, marginBottom: 5, flex: 0 },
    btn: {
        width: "120%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FFA831",
    },

    btnSubmit: {
        // width: "120%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 40,
        backgroundColor: "#FFA891",
    },
})



export default FormComment
