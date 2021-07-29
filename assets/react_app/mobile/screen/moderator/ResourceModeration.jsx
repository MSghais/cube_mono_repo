
import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { connect, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, Picker, TouchableOpacity, View, Button, ImageBackground, TextInput, ActivityIndicator, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { resourcesTypes, findRessources, moderateResource } from '../../services/myResourcesService';
import TokenManager from '../../services/security/TokenManager';
import ModalConfirm from '../../component/modal/ModalConfirm';
import { _tokenIsValid } from '../../services/authService';
export const KEY_TOKEN = 'token'

const ResourceModeration = ({ dispatch }) => {

    const navigation = useNavigation()
    // reducers 
    const auth = useSelector(state => state.auth)
    const resources = useSelector(state => state.resource)

    //loader
    if (auth.loading) {
        return <ActivityIndicator />
    }
    //    check if token are 
    const token = auth.token
    if (!token
        || token.length === 0
        || !auth.user
        || auth.user.role !== 'ROLE_MODERATOR'
        || TokenManager.getRole(token) !== 'ROLE_MODERATOR'
    ) {
        navigation.navigate('Resource')
    }

    console.log('auth', auth)
    const [resourcesState, setResources] = React.useState([])
    const [redirection, setRedirection] = React.useState(false)
    const [needUpdate, setNeedUpdate] = React.useState(false)
    const [resourceIndex, setResourceIndex] = React.useState("")


    const manageContainerResource = (id, index, bool) => {
        setOpenConfirm(!openConfirm)
        setModalIndex(index)
        setResourceIndex(id)
    }




    const handleModerate = (id, bool) => {
        console.log('auth token', auth.token)
        console.log('id resource', id)
        console.log('bool for moderation : isValidated or !isValidated && !isPublic', bool)
        // setNeedUpdate(true)
        if (TokenManager.getRole(auth.token) == "ROLE_MODERATOR" && auth.user.role == "ROLE_MODERATOR" && auth.token && TokenManager.isModerator(auth.token) && _tokenIsValid(auth.token)) {
            moderateResource({ resource_id: id, bool }, auth.token).then(res => {
                console.log(res)
                // setRedirection(true)
            })
        }
        else {
            alert('Fuck of  ')
        }

    }

    console.log('resources', resources)

    // if(redirection) return (<Redirect to="/moderation/resources" />)

    // if(redi)



    const [page, setPage] = React.useState(0);
    const [opensModalConfirmRow, setOpenModal] = React.useState([]);

    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [openContentsResource, setOpenContentsResource] = React.useState(false);
    const [modalIndex, setModalIndex] = React.useState(0);

    const optionsPerPage = [2, 4, 6]
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    if (resources.loading) {
        return <ActivityIndicator />
    }

    const containerModerationRendering = (resource) => {
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

                    {/* Delete button */}
                    <View style={styles.espace}>
                        <TouchableOpacity
                            onPress={() => handleModerate(id, false)}
                            style={styles.btnIsNotValidated}
                        >
                            <Text style={styles.loginText}>Refus&</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Validation button */}
                    <View style={styles.espace}>
                        <TouchableOpacity
                            onPress={() => handleModerate(id, true)}
                            style={styles.btnIsValidated}
                        >
                            <Text style={styles.loginText}>Validation</Text>
                        </TouchableOpacity>
                    </View>


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



            </View >
        )

    }

    return (

        <View>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Title</DataTable.Title>
                    <DataTable.Title numeric>Username</DataTable.Title>
                    <DataTable.Title numeric>Type</DataTable.Title>
                    <DataTable.Title numeric>Public</DataTable.Title>
                    <DataTable.Title numeric>Validé</DataTable.Title>

                    {/* <DataTable.Title numeric>Fat</DataTable.Title> */}
                </DataTable.Header>
                {/* {resources.loading && <ActivityIndicator />} */}

                {resources.data.length === 0 ?
                    <View>
                        <Text> No ressources to manage </Text>
                    </View>

                    // : resourcesState.map((resource) => {
                    : resources.data.map((resource, index) => {
                        // console.log('resource to display', resource)
                        const id = resource.id
                        console.log('resource id ', id)

                        const textModal = (
                            <Text>
                                {modalIndex == index && openConfirm ? "Close" : "Open"}
                            </Text>
                        )



                        const row = (

                            <View>

                                <DataTable.Row>
                                    <DataTable.Cell>{resource.title}</DataTable.Cell>
                                    <DataTable.Cell>{resource.author && resource.author.firstname
                                        ? resource.author.firstname :
                                        "Unknow"}
                                    </DataTable.Cell>

                                    <DataTable.Cell>{resource.type && resource.type.label}</DataTable.Cell>
                                    <DataTable.Cell>{resource.isPublic ? "Public" : "In process"}</DataTable.Cell>
                                    <DataTable.Cell>{resource.isValidated ? "Validé" : "Invisible"}</DataTable.Cell>

                                </DataTable.Row>


                                <View>
                                    <TouchableOpacity
                                        onPress={() => manageContainerResource(id, index, true)}
                                        style={styles.btnForDelete}
                                    >
                                        <Text style={styles.loginText}>Moderate</Text>
                                    </TouchableOpacity>

                                </View>

                                {openConfirm && resourceIndex == id && modalIndex == index
                                    &&
                                    <View>
                                        <Text> Container de modération</Text>
                                        {containerModerationRendering(resource)}
                                    </View>}

                            </View>
                        )


                        return row

                    })

                }


                <DataTable.Pagination
                    page={page}
                    numberOfPages={3}
                    onPageChange={(page) => setPage(page)}
                    label="1-2 of 6"
                    optionsPerPage={optionsPerPage}
                    itemsPerPage={itemsPerPage}
                    setItemsPerPage={setItemsPerPage}
                    showFastPagination
                    optionsLabel={'Rows per page'}
                />
            </DataTable>

        </View>

    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    resources: state.resources
});

// export default ResourceDetail
export default connect(mapStateToProps)(ResourceModeration)




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

        alignItems: 'center',
        textAlign: 'center',
        color: '#FFF',
        backgroundColor: '#FFF'
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



    btnIsNotValidated: {
        width: 50,
        position: "absolute",
        top: 10,
        left: 15,
        borderRadius: 25,
        height: 50,
        alignItems: "flex-start",
        justifyContent: "center",
        // marginTop: 40,
        backgroundColor: "#FFA831",
    },

    btnIsValidated: {
        width: 50,
        position: "absolute",
        top: 10,
        right: 15,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        // marginTop: 40,
        backgroundColor: "#FFA831",
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
