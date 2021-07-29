
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground, TextInput } from 'react-native'
import CommentDisplay from '../comment/CommentDisplay';

const ContainerModeration = ({ resource,
    // view contents
    openContentsResource,
    setOpenContentsResource,
    // view contents
    handleModerate,

    // management commentaries
    isOpenCommentManagement, setCommentManagement,
    moderateComment,
}
) => {
    const id = resource.id

    return (

        <View
         style={styles.containerModeration}
         >

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

            {openContentsResource &&
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



            <View 
            style={styles.manageResource}
            >
                {/* Delete button */}
                {/* <View style={styles.espace */}
                {/* }> */}
                    <TouchableOpacity
                        onPress={() => handleModerate(id, false)}
                        style={styles.btnIsNotValidated}
                    >
                        <Text style={styles.txtButton}>Refusé</Text>
                    </TouchableOpacity>
                {/* </View> */}

                {/* Validation button */}
                {/* <View style={styles.espace} */}
                {/* > */}
                    <TouchableOpacity
                        onPress={() => handleModerate(id, true)}
                        style={styles.btnIsValidated}
                    >
                        <Text style={styles.txtButton}>Validation</Text>
                    </TouchableOpacity>
                {/* </View> */}

            </View>




            {/* View comments of the article */}
            <View>
                <TouchableOpacity
                    onPress={() => setCommentManagement(!isOpenCommentManagement)}
                    style={styles.btnForDelete}
                >
                    <Text style={styles.loginText}>View comment</Text>
                </TouchableOpacity>

            </View>

            {isOpenCommentManagement &&
                <CommentDisplay
                    resourceId={id}
                    catchRefresh={moderateComment}
                />}

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
        margin: 40,
        borderRadius: 10,
        flexDirection: "row",

        // display:"flex",
        display: 'flex',
        width:'250px',
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: '#FFF'
    },
    btnIsNotValidated: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "oldlace",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
        // width: 60,
        // // position: "absolute",
        // top: 10,
        // left: 15,
        // // borderRadius: 25,
        // height: 50,
        // // alignItems: "flex-start",
        // // justifyContent: "center",
        // // marginTop: 40,
        // backgroundColor: "#97161b",
    },

    btnIsValidated: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: "oldlace",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
        // width: 60,
        // // position: "absolute",
        // top: 10,
        // right: 15,
        // borderRadius: 25,
        // height: 50,
        // // alignItems: "center",
        // // justifyContent: "center",
        // // marginTop: 40,
        // backgroundColor: "#4b6113",
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
