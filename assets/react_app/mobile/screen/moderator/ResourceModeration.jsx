
import * as React from 'react';
import { DataTable } from 'react-native-paper';
import { connect, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { actionsTypes, findRessources } from '../../services/myResourcesService';
export const KEY_TOKEN = 'token'

const ResourceModeration = ({ dispatch }) => {

    const navigation = useNavigation()
    const auth = useSelector(state => state.auth)
    console.log('auth', auth)
    const [resources, setResources] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            const res = await findRessources()
            console.log('res', res)
            const resourcesData = res['hydra:member']

            setResources(resourcesData)
            dispatch({ type: actionsTypes.getResources, data: resourcesData })
        }

        fetchData()
    }, [])
    console.log('resources', resources)

    const [page, setPage] = React.useState(0);
    const optionsPerPage = [2, 4, 6]
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    if (auth.user.role !== 'ROLE_MODERATOR') {
        navigation.navigate('Resource')
    }
    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Title</DataTable.Title>
                <DataTable.Title numeric>Username</DataTable.Title>
                <DataTable.Title numeric>Type</DataTable.Title>
                <DataTable.Title numeric>Public</DataTable.Title>
                <DataTable.Title numeric>Fat</DataTable.Title>
            </DataTable.Header>

            {resources.length === 0 ?
                <View>

                </View>

                // : resources.data.resources.map((resource) => {
                : resources.map((resource) => {


                    <View key={resource.id}>

                        <DataTable.Row>
                            <DataTable.Cell>{resource.title}</DataTable.Cell>
                            <DataTable.Cell>{resource.author.firstName}</DataTable.Cell>
                            <DataTable.Cell>{resource.type.label}</DataTable.Cell>
                            <DataTable.Cell>{resource.isPublic ? "Public" : "In process"}</DataTable.Cell>
                        </DataTable.Row>


                    </View>
                })

            }

            {/* <DataTable.Row>
                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
                <DataTable.Cell numeric>8.0</DataTable.Cell>
            </DataTable.Row> */}

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
