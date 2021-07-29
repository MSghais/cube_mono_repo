import React, { useEffect, useState } from 'react'
import { Button, FlatList, StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground, ActivityIndicator } from 'react-native'
import { KEY_TOKEN, logoutAuth } from '../services/authService'
import ResourcesCard from '../component/post/ResourcesCard'
import { connect, useSelector } from 'react-redux';
import { findRessources, resourcesTypes } from '../services/myResourcesService'


const ResourcesDisplay = ({ navigation, route, token, dispatch, props }) => {

    const [resourcesData, setResources] = useState([])
    const [loader, setLoader] = useState(true)

    const auth = useSelector(state => state.auth)
    const resource = useSelector(state => state.resource)


    useEffect(() => {
        const fetchData = async () => {
            const res = await findRessources()
            dispatch({ type: resourcesTypes.loading })

            console.log('res', res)
            const resourcesData = res['hydra:member']
            setResources(resourcesData)
            setLoader(false)
            dispatch({ type: resourcesTypes.getResources, data: resourcesData })

        }

        fetchData()
    }, [])
    if (resource.loading || !resourcesData || resourcesData.length == 0) {
        return <View>
            <ActivityIndicator />
            <Text style={styles.titre}> Aucune resource disponible actuellement </Text>
        </View>
    }
    console.log(resource)



    const logout = () => {
        console.log("adios")
        console.log(token)
        logoutAuth()
        token = null
        console.log(token)
        navigation.navigate('Login')
    }

    console.log('loader', loader)

    return (

        <ImageBackground style={{ width: '100%', height: '100%' }} source={require("../assets/background-vertical.png")}>

            <View style={styles.container}>
                <Text style={styles.titre}>
                    Ressources
                </Text>
                { !resourcesData  || resourcesData.length === 0 || resource.loading &&

                    <View>
                        <ActivityIndicator />
                        <Text style={styles.titre}> Aucune resource disponible actuellement </Text>
                    </View>
                }

                <ScrollView>

                    {resource.loading && <ActivityIndicator />}

                    {resource.data.length === 0
                        ? <Text style={styles.titre} > Aucune ressource disponible </Text>
                        : <FlatList
                            data={resource.data}
                            keyExtractor={item => item.nom}
                            renderItem={({ item }) => <ResourcesCard
                                user={token}
                                resource={item} navigation={navigation}
                            />}
                        />
                    }

                </ScrollView>
                {/* <ScrollView>

                    {resource.data.length === 0
                        ? <Text style={styles.titre} > Aucune ressource disponible </Text>
                        : <FlatList
                            data={resource.data}
                            keyExtractor={item => item.nom}
                            renderItem={({ item }) => <ResourcesCard
                                user={token}
                                resource={item} navigation={navigation}
                            />}
                        />
                    }

                </ScrollView> */}


                {typeof auth.token == 'string' &&
                    auth.token &&
                    auth.token.length > 0 &&
                    <View style={styles.espace}>
                        <TouchableOpacity onPress={logout} style={styles.loginBtn}>
                            <Text style={styles.loginText}>Se Déconnecter</Text>
                        </TouchableOpacity>
                    </View>
                }



            </View>
        </ImageBackground>

    )
}

const mapStateToProps = state => ({
    auth: state.auth,
    resources: state.resources
});


export default connect(mapStateToProps)(ResourcesDisplay)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#1C3041',
        alignItems: 'center',
        justifyContent: 'center',
    },
    espace: {
        margin: 10,
    },
    topLeft: {
        position: "absolute",
        top: 10,
        // right:15,
        left: 15,
        textAlign: 'left'

    },
    topRight: {
        position: "absolute",
        top: 10,
        right: 15,
    },

    categoryLabel: {
        top: 10,
        left: 0,
    },

    authorName: {
        fontSize: 'smaller'
    },

    titleArticle: {
        fontSize: 'smaller'
    },

    lineStyle: {
        borderWidth: 0.5,
        borderColor: 'black',
        margin: 10,
    },
    to: {
        backgroundColor: 'lightgray',
        marginBottom: 5,
    },
    loginBtn: {
        width: "100%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FFA831",
    },
    titre: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        color: '#FFF',
        marginTop: 20
    },
})
