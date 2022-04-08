import { useState } from 'react'
import MapView, { Marker, Callout, Circle } from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default function App() {
	const [ region, setRegion ] = useState({
			latitude: 31.097333,
			longitude: 30.947334,
			latitudeDelta: 0.1922,
			longitudeDelta: 0.1421
		})

	return (
		<View style={styles.container}>
		<GooglePlacesAutocomplete
					placeholder="Search"
					fetchDetails={true}
					GooglePlacesSearchQuery={{
						rankby: "distance"
					}}
					onPress={(data, details = null) => {
						console.log(data, details)
						setRegion({
							latitude: details.geometry.location.lat,
							longitude: details.geometry.location.lng,
							latitudeDelta: 0.1922,
							longitudeDelta: 0.1421
						})
					}}
					query={{
						key: "Put your key here",
						language: "en",
						radius: 30000,
						location: `${region.latitude}, ${region.longitude}`
					}}
					styles={{
						container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
						listView: { backgroundColor: "white" }
					}}
				/>
		<MapView 
			style={styles.map} 
			region={{
			latitude: region.latitude,
			longitude: region.longitude,
			latitudeDelta: 0.1922,
			longitudeDelta: 0.1421
			}}
			provider="google"
		>
					<Marker
						coordinate={{ latitude: region.latitude, longitude: region.longitude }}
						pinColor="black"
						draggable={true}
						onDragStart={(e) => {
							console.log("Drag start ", e.nativeEvent.coordinate)
						}}
						onDragEnd={(e) => {
				console.log("Drag end ", e.nativeEvent.coordinate)
							setRegion({
								latitude: e.nativeEvent.coordinate.latitude,
								longitude: e.nativeEvent.coordinate.longitude
							})
						}}
					>
			<Callout>
				<Text>
				I'm Here..
				</Text>
			</Callout>
			</Marker>
			<Circle
			center={region}
			radius={2000}
			fillColor="#b22b2b77"
			strokeWidth={1}
			strokeColor="#0000"
			/>
		</MapView>
		</View>
	)
	}

	const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		marginTop: 34,
	},
	map: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
	},
})
