import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function CreateListing() {
    const [geoLocationEnabled, setGeoLocationEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        type: "rent",
        name: "",
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: "",
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })

    const { type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude } = formData;

    const auth = getAuth();
    const navigate = useNavigate();
    const isMounted = useRef(true);

    useEffect(() => {
        if (isMounted) {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid })
                } else {
                    navigate("sign-in")
                }
            })
        }
        return () => {
            isMounted.current = false
        }
    }, [isMounted])

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    const onMutate = (e) => {
        let boolean = null;

        if(e.target.value === 'true') {
            boolean = true;
        }
        if(e.target.value === 'false') {
            boolean = false;
        }

        // Files
        if(e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }));
        }

        // Text/Booleans/Numbers
        if(!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value
            }));
        }
    }

    if (loading) {
        return <Spinner />
    }
    return (
        <div className="profile">
            <header>
                <p className="pageHeader">Create a listing</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>

                    <label className="formLabel" htmlFor="type">Sell / Rent</label>
                    <div className="formButtons div">
                        <button
                            type="button"
                            className={type === "sale" ? "formButtonActive" : "formButton"}
                            id="type"
                            value="sale"
                            onClick={onMutate}
                        >
                            Sell
                        </button>
                        <button
                            type="button"
                            className={type === "rent" ? "formButtonActive" : "formButton"}
                            id="type"
                            value="rent"
                            onClick={onMutate}
                        >
                            rent
                        </button>
                    </div>

                    <label className="formLabel" htmlFor="name">Name</label>
                    <input
                        className="formInputName"
                        type="text"
                        id="name"
                        value={name}
                        onChange={onMutate}
                        maxLength="32"
                        minLength="10"
                        required
                    />

                    <div className="formRooms">
                        <div>
                            <label className="formLabel" htmlFor="bedrooms">Bedrooms</label>
                            <input
                                className="formInputSmall"
                                type="number"
                                id="bedrooms"
                                value={bedrooms}
                                onChange={onMutate}
                                min="1"
                                max="50"
                                required
                            />
                        </div>
                        <div>
                            <label className="formLabel" htmlFor="bathrooms">Bathrooms</label>
                            <input
                                className="formInputSmall"
                                type="number"
                                id="bathrooms"
                                value={bathrooms}
                                onChange={onMutate}
                                min="1"
                                max="50"
                                required
                            />
                        </div>
                    </div>

                    <label className="formLabel" htmlFor="parking">Parking Spot</label>
                    <div className="formButtons">
                        <button
                            className={parking ? "formButtonActive" : "formButton"}
                            type="button"
                            id="parking"
                            value={true}
                            onClick={onMutate}
                            min="1"
                            max="50"
                        >
                            Yes
                        </button>
                        <button
                            className={!parking && parking !== null ? "formButtonActive" : "formButton"}
                            type="button"
                            id="parking"
                            value={false}
                            onClick={onMutate}
                            min="1"
                            max="50"
                        >
                            No
                        </button>
                    </div>

                    <label className="formLabel" htmlFor="furnished">Furnished</label>
                    <div className="formButtons">
                        <button
                            className={furnished ? "formButtonActive" : "formButton"}
                            type="button"
                            id="furnished"
                            value={true}
                            onClick={onMutate}
                        >
                            Yes
                        </button>
                        <button
                            className={!furnished && furnished !== null ? "formButtonActive" : "formButton"}
                            type="button"
                            id="furnished"
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>
                    </div>

                    <label className="formLabel" htmlFor="address">Address</label>
                    <textarea
                        className="formInputAddress"
                        type="text"
                        id="address"
                        value={address}
                        onChange={onMutate}
                        required
                    />

                    {!geoLocationEnabled && (
                        <div className="formLatLng">
                            <div>
                                <label htmlFor="latitude" className="formLabel">Latitude</label>
                                <input
                                    className="formInputSmall"
                                    type="number"
                                    id="latitude"
                                    value={latitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="longitude" className="formLabel">Longitude</label>
                                <input
                                    className="formInputSmall"
                                    type="number"
                                    id="longitude"
                                    value={longitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <label htmlFor="offer" className="formLabel">Offer</label>
                    <div className="formButtons">
                        <button
                            className={offer ? "formButtonActive" : "formButton"}
                            type="button"
                            id="offer"
                            value={true}
                            onClick={onMutate}
                        >
                            Yes
                        </button>
                        <button
                            className={!offer && offer !== null ? "formButtonActive" : "formButton"}
                            type="button"
                            id="offer"
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>
                    </div>

                    <label htmlFor="regularPrice" className="formLabel"> Regular Price</label>
                    <div className="formPriceDiv">
                        <input
                            className="formInputSmall"
                            type="number"
                            id="regularPrice"
                            value={regularPrice}
                            onChange={onMutate}
                            min="50"
                            max="750000000"
                            required
                        />
                        {type === "rent" && (
                            <p className="formPriceText"> $ / Month</p>
                        )}
                    </div>

                    {offer && (
                        <div>
                            <label htmlFor="discountedPrice" className="formLabel">Discounted Price</label>
                            <input
                                className="formInputSmall"
                                type="number"
                                id="discountedPrice"
                                value={discountedPrice}
                                onChange={onMutate}
                                min="50"
                                max="750000000"
                                required={offer}
                            />
                        </div>
                    )}

                    <label htmlFor="images" className="formLabel">Images</label>
                    <p className="imagesInfo">The first image will be the cover (max 6).</p>
                    <input
                        className="formInputFile"
                        type="file"
                        id="images"
                        onChange={onMutate}
                        max="6"
                        accept=".jpg,.png,.jpeg"
                        multiple
                        required
                    />
                    <button 
                    className="primaryButton createListingButton"
                    type="submit">
                        Create Listing
                    </button>

                </form>
            </main>
        </div>
    )
}

export default CreateListing