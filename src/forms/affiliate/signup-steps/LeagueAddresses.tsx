import { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
// TOD: import { useFormik } from "formik";
import * as Yup from "yup";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
// TODO: import { geocodeByPlaceId } from 'react-google-places-autocomplete';

interface AddressesFields {
    mailingAddressObject?: Object,
    mailingAddressText: string,
    playingFacilityName: string,
    playingFacilityLocationObject?: Object,
    playingFacilityLocationText: string
}

type PreStepsProps = {
    handleSuccessStep: (arg: number) => void
}

type location1Props = {
    label: string
}

const tempAPIKey = 'AIzaSyA8vejxIx686PpYxiXBqGpovVCZRurJBLQ';

const LeagueAddresses = ({ handleSuccessStep }: PreStepsProps) => {
    const [successful, setSuccessful] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [location1, setLocation1] = useState<location1Props>({label: ""});

    useEffect(() => {

    }, []);

    const initialValues: AddressesFields = {
        mailingAddressText: "lorem ipsum",
        playingFacilityName: "",
        playingFacilityLocationText: "lorem ipsum"
    };

    const validationSchema = Yup.object().shape({
        mailingAddressText: Yup.string()
            .required("This field is required!"),
        playingFacilityName: Yup.string()
            .required("This field is required!"),
        playingFacilityLocationText: Yup.string()
            .required("This field is required!")
    });

    // TODO: handleSubmit()
    const handleSubmit = () => {
        setSuccessful(false);
        setMessage('');
        setLoading(true);
        handleSuccessStep(3);
        console.log('Location1:' + location1);
    };

    return (
        <div className="LeagueName">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="flex flex-col gap-5">
                    <div className="form-group my-10">
                        <div className="instruction text-center text-lg">
                            <p>Set your Affiliate Mailing &amp; Playing Address - this will also dictate your League's country, location radius and time zone.</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <Field name="mailingAddressText" type="text" className="form-control hidden" placeholder="44 Mamaroneck Ave. White Plains, NY, USA" />
                        <GooglePlacesAutocomplete apiKey={tempAPIKey}
                            selectProps={{
                                location1,
                                onChange: setLocation1,
                                className: 'location-selector'
                            }}
                            autocompletionRequest={{

                            }}
                        />
                        <label htmlFor="mailingAddressText">Affiliate Mailing Address<span></span></label>
                        <ErrorMessage
                            name="mailingAddressText"
                            component="div"
                            className="alert alert-danger"
                        />

                    </div>
                    <div className="form-group">
                        <Field name="playingFacilityName" type="text" className="form-control" placeholder="Saxon Woods Park" />
                        <label htmlFor="playingFacilityName">Name of Playing Facility<span></span></label>
                        <ErrorMessage
                            name="playingFacilityName"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>
                    <div className="form-group">
                        <Field name="playingFacilityLocationText" type="text" className="form-control hidden test" placeholder="1800 Mamaroneck Ave, White Plains, NY,USA" />
                        <GooglePlacesAutocomplete apiKey={tempAPIKey}
                            selectProps={{
                                location1,
                                onChange: setLocation1,
                                className: 'location-selector'
                            }}
                            autocompletionRequest={{

                            }}
                        />
                        <label htmlFor="playingFacilityLocationText">Location of Playing Facility<span></span></label>
                        <ErrorMessage
                            name="playingFacilityLocationText"
                            component="div"
                            className="alert alert-danger"
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn narrow" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Submit</span>
                        </button>
                    </div>


                    {message && (
                        <div className="form-group">
                            <div
                                className={
                                    successful ? "alert success" : "alert danger"
                                }
                                role="alert"
                            >
                                {message}
                            </div>
                        </div>
                    )}
                </Form>
            </Formik>
        </div>

    )
};

export default LeagueAddresses;