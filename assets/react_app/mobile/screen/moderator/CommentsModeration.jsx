
import * as React from 'react';
import { DataTable } from 'react-native-paper';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, useSelector } from 'react-redux';
import { Image, StyleSheet, Text, TouchableOpacity, View, Button, ImageBackground, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { createComment } from "../../services/commentService";

// import displayComment from './displayComment';
export const KEY_TOKEN = 'token'

const CommentModeration = ({ navigation, route, state }) => {

    const resource = route.params.resource;
    const handlePress = () => {
        navigation.pop();
    }


    const auth = useSelector(state => state.auth)
    console.log('auth', auth)
    const _retrieveToken = async () => {
        try {
            const token = await AsyncStorage.getItem(KEY_TOKEN);
            return token;
        } catch (error) {
            // Error retrieving data
        }
    };

    const token = _retrieveToken().then(res => res)
    console.log('token in resource detail', token)

    const [content, setContent] = React.useState('')
    const [comment, setComment] = React.useState({
        // content: content,
        content,
        resource: { value: `/api/resources/${resource.id}` },
        createdAt: { value: new Date() },
        parentComment: { value: "" },
        userEntity: { value: "" },
    })

    const handleSubmit = () => {
        console.log('content', content)
        let commentToSend = {
            // content: comment.content.value,
            content: content,
            resource: comment.resource.value,
            createdAt: comment.createdAt.value,
            userEntity: `api/users/201`,
            // userEntity: `api/users/${AuthHandler.user.id}`,
            // parentComment: commentId ? `api/comments/${commentId}` : null
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

    const [page, setPage] = React.useState < number > (0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);




    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title>Dessert</DataTable.Title>
                <DataTable.Title numeric>Calories</DataTable.Title>
                <DataTable.Title numeric>Fat</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
                <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                <DataTable.Cell numeric>159</DataTable.Cell>
                <DataTable.Cell numeric>6.0</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
                <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                <DataTable.Cell numeric>237</DataTable.Cell>
                <DataTable.Cell numeric>8.0</DataTable.Cell>
            </DataTable.Row>

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
export default connect(mapStateToProps)(CommentModeration)


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
