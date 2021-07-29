
import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { connect, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground, TextInput, ActivityIndicator, ScrollView } from 'react-native'
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

    const handleModerate = (id, bool) => {
        console.log('auth token', auth.token)
        console.log('id resource', id)

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

    // if(redirection) return (<Redirect to="/moderation/resources" />)

    // if(redi)

    // React.useEffect(() => {
    //     const fetchData = async () => {
    //         dispatch({ type: resourcesTypes.loading })
    //         const res = await findRessources()
    //         console.log('res', res)
    //         const resourcesData = res['hydra:member']

    //         setResources(resourcesData)
    //         dispatch({ type: resourcesTypes.getResources, data: resourcesData })
    //         dispatch({ type: resourcesTypes.unload })

    //     }
    //     fetchData()
    // }, [])

    console.log('resources', resources)

    const [page, setPage] = React.useState(0);
    const [opensModalConfirmRow, setOpenModal] = React.useState([]);

    const [openConfirm, setOpenConfirm] = React.useState(false);
    const [modalIndex, setModalIndex] = React.useState(0);

    const optionsPerPage = [2, 4, 6]
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);


    if (resources.loading) {
        return <ActivityIndicator />
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
                    <DataTable.Title >Manage</DataTable.Title>

                    {/* <DataTable.Title numeric>Fat</DataTable.Title> */}
                </DataTable.Header>
                {resources.loading && <ActivityIndicator />}

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

                        const containerModerationRendering = (resource) => (

                            <View style={styles.manageResource}>


                                <DataTable.Cell color="secondary" variant="contained">
                                    <Button
                                        style={styles.btnIsNotValidated}
                                        onPress={() => handleModerate(id, false)}>
                                        Refuser
                                    </Button>
                                </DataTable.Cell>


                                <DataTable.Cell color="primary" onClick={() => handleModerate(id, true)} variant="contained">
                                    <Button
                                        style={styles.btnIsValidated}
                                        onPress={() => handleModerate(id, true)}>
                                        Valider
                                    </Button>
                                </DataTable.Cell>
                            </View>
                        )

                        const row = (

                            <View>

                                <DataTable.Row>
                                    <DataTable.Cell>{resource.title}</DataTable.Cell>
                                    <DataTable.Cell>{resource.author && resource.author.firstName}</DataTable.Cell>

                                    <DataTable.Cell>{resource.type.label}</DataTable.Cell>
                                    <DataTable.Cell>{resource.type && resource.type.label}</DataTable.Cell>
                                    <DataTable.Cell>{resource.isPublic ? "Public" : "In process"}</DataTable.Cell>
                                    <DataTable.Cell>{resource.isValidated ? "Validé" : "Invisible"}</DataTable.Cell>

                                    <View style={styles.manageResource}>


                                        <DataTable.Cell color="secondary" variant="contained">
                                            <Button
                                                style={styles.btnIsNotValidated}
                                                onPress={() => handleModerate(id, false)}>
                                                Refuser
                                            </Button>
                                        </DataTable.Cell>


                                        <DataTable.Cell color="primary" onClick={() => handleModerate(id, true)} variant="contained">
                                            <Button
                                                style={styles.btnIsValidated}
                                                onPress={() => handleModerate(id, true)}>
                                                Valider
                                            </Button>
                                        </DataTable.Cell>
                                    </View>
                                </DataTable.Row>
                                {
                                    openConfirm && modalIndex == index &&
                                    <ModalConfirm
                                        id={id}
                                        handleModerate={(id) => handleModerate(id)} />
                                }
                                {openConfirm && modalIndex == index &&
                                    containerModeration(resource.data[modalIndex])
                                }
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

            {/* </ScrollView> */}

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

    manageResource: {
        flex: 1, margin: 40, borderRadius: 10, flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: '#FFF', backgroundColor: '#FFF'
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
    btnIsNotValidated: {
        width: "120%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        // backgroundColor: "#FFA831",
        backgroundColor: "red",

    },

    btnIsValidated: {
        // width: "120%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        // backgroundColor: "#FFA891",
        backgroundColor: "blue",

    },
})
