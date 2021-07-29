
import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { connect, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, Picker, TouchableOpacity, View, Button, ImageBackground, TextInput, ActivityIndicator, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { resourcesTypes, findRessources, moderateResource, getCommmentsResource } from '../../services/myResourcesService';
import TokenManager from '../../services/security/TokenManager';
import ModalConfirm from '../../component/modal/ModalConfirm';
import { _tokenIsValid } from '../../services/authService';
import ContainerModeration from '../../component/container/Moderation';
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
        if (TokenManager.getRole(auth.token) == "ROLE_MODERATOR" && auth.user.role == "ROLE_MODERATOR" && auth.token && TokenManager.isModerator(auth.token) && _tokenIsValid(auth.token)) {
            moderateResource({ resource_id: id, bool }, auth.token).then(res => {
                console.log(res)
            })
        }
        else {
            alert('Fuck of  ')
        }

    }

    console.log('resources', resources)
    const [page, setPage] = React.useState(0)
    // view moderation container
    const [openConfirm, setOpenConfirm] = React.useState(false);
    // view content of one ressources
    const [openContentsResource, setOpenContentsResource] = React.useState(false);
    const [isOpenCommentManagement, setCommentManagement] = React.useState(false);
    const [modalIndex, setModalIndex] = React.useState(0);

    // for pagination after if needed ?
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
            <ImageBackground style={{ width: '100%', height: '100%' }}

            //  source={require("../../assets/background-vertical.png")}
            >

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


                                    <View style={{ alignItems: 'center' }}>
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
                                            {/* {containerModerationRendering(resource)} */}
                                            <ContainerModeration
                                                setOpenContentsResource={setOpenContentsResource}
                                                openContentsResource={openContentsResource}
                                                resource={resource}
                                                isOpenCommentManagement={isOpenCommentManagement}
                                                setCommentManagement={setCommentManagement}
                                                handleModerate={handleModerate}
                                            />
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

            </ImageBackground>

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
        width: "250px",
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



    btnForDelete: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 4,
        // backgroundColor: "oldlace",
        alignSelf: "flex-start",
        marginHorizontal: "1%",
        marginBottom: 6,
        minWidth: "48%",
        textAlign: "center",
        // width: "80%",
        // borderRadius: 25,
        // height: 50,
        // alignItems: "center",
        // justifyContent: "center",
        // marginTop: 40,
        backgroundColor: "#FFA831",
    },



})
