
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createComment } from "../services/commentService";
import { moderateResource } from "../services/myResourcesService";
import CommentDisplay from './CommentDisplay';
import FormComment from './FormComment';
import TokenHandler from '../services/security/TokenManager';

// import displayComment from './displayComment';
export const KEY_TOKEN = 'token'

const ResourceDetail = ({ navigation, route, state }) => {

    const resource = route.params.resource;
    const handlePress = () => {
        navigation.pop();
    }


    const auth = useSelector(state => state.auth)
    console.log('auth', auth)
    const token = auth.token
    const [content, setContent] = React.useState('')

    const handleModerate = (id, bool) => {
        console.log('auth token', auth.token)
        console.log('id resource', id)
        if (
            auth.token
            && auth.user.role == "ROLE_MODERATOR"
            && TokenHandler.getRole(auth.token) == "ROLE_MODERATOR"
            && TokenHandler.isModerator(auth.token)
            && _tokenIsValid(auth.token)
        ) {
            moderateResource({ resource_id: id, bool }, auth.token).then(res => {
                console.log(res)
            })
        }
        else {
            alert('Fuck of  ')
        }

    }

    const containerModerationRendering = (resource) => {
        const id = resource.id
        return (

            <View style={styles.containerModeration}>

                <Text>
                    Moderation container
                </Text>

                <View style={styles.manageResource}>
                    <Button
                        style={styles.btnIsNotValidated}
                        onPress={() => handleModerate(id, false)}>
                        <Text
                            style={styles.txtButton}>
                            Refuser
                        </Text>
                    </Button>

                    <Button
                        style={styles.btnIsNotValidated}
                        onPress={() => handleModerate(id, true)}>
                        <Text
                            style={styles.txtButton}>
                            Valider
                        </Text>
                    </Button>
                </View>

                <View>
                    <Button
                        style={styles.btnIsNotValidated}
                        onPress={() => handleModerate(id, true)}
                    >
                        <Text
                            style={styles.txtButton}>
                            Delete
                        </Text>
                    </Button>
                    {/* Delete button */}
                    <View style={styles.espace}>
                        <TouchableOpacity
                            onPress={() => handleModerate(id, true)}
                            style={styles.btnForDelete}
                        >
                            <Text style={styles.loginText}>Se Déconnecter</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )

    }





    return (
        <ImageBackground style={{ width: '100%', height: '100%' }} source={require("../assets/background-vertical.png")}>
            <ScrollView style={styles.main}>

                <View style={styles.topLeft}>

                    {resource.type &&
                        <View >
                            {resource.type.createdAt &&
                                <Text >{resource.type.createdAt}</Text>
                            }
                            {resource.type.label &&
                                <Text style={styles.label}>{resource.type.label}</Text>
                            }
                        </View>
                    }

                    {resource.category &&
                        <View style={styles.categoryLabel}>
                            {resource.category.label &&
                                <Text >{resource.category.label}</Text>
                            }
                        </View>
                    }
                </View>

                <Image source={{ uri: resource.imageUrl }} style={styles.img}></Image>

                <Text style={styles.titleArticle}>{resource.title}</Text>




                {resource.content && resource.content.length > 0 &&
                    <View>
                        {resource.content.map((cont) => [
                            <View>
                                {cont.attribute && cont.attribute.label && <Text styles={styles.attributeLabel}> {cont.attribute.label}  :  </Text>}
                                <Text styles={styles.textValue}> {cont.textValue}</Text>
                            </View>
                        ])}

                    </View>

                }

                {auth.token && auth.user.id &&
                    <View>
                        <FormComment
                            resource={resource}
                        />
                    </View>
                }


                <View>
                    <CommentDisplay
                        resourceId={resource.id}
                    />
                </View>

                {auth && auth.token && auth.user &&
                    auth.token && auth.token.length > 0
                    && TokenHandler.isModerator(auth.token) && !TokenHandler.isExpired(auth.token)
                    && containerModerationRendering(resource)
                }

                <TouchableOpacity
                    onPress={handlePress} >
                    <View
                        style={styles.btn}
                        title="Retour">
                        Retour
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </ImageBackground>
    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    resources: state.resources
});

// export default ResourceDetail
export default connect(mapStateToProps)(ResourceDetail)




const styles = StyleSheet.create({
    main: { flex: 1, margin: 40, borderRadius: 10, flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#FFF', backgroundColor: '#FFF' },

    attributeLabel: {
        fontSize: 11,
        fontWeight: 'bold',
        textAlign: 'left',
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
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
        marginTop: 40,
        backgroundColor: "#FFA891",
    },
})
