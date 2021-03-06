import * as types from "constants/actionTypes";
import * as coreTypes from "_core/constants/actionTypes";
import JSZip from "jszip";
import saveAs from "save-as";
import * as MSFTypes from "constants/MSFTypes";

export function hideFeatureDetailContainer() {
    return { type: types.HIDE_FEATURE_DETAIL };
}

export function changePlumeChartMode(value) {
    return { type: types.CHANGE_PLUME_CHART_MODE, value };
}

export function togglePlumesWithObservationsOnly() {
    return { type: types.TOGGLE_PLUMES_WITH_OBSERVATIONS_ONLY };
}

export function changeInfrastructureChartMode(value) {
    return (dispatch, getState) => {
        const analyticsMsg = (function() {
            switch (value) {
                case MSFTypes.INFRASTRUCTURE_SOURCES_LIST:
                    return types.INFRASTRUCTURE_LIST_MODE;
                case MSFTypes.INFRASTRUCTURE_SOURCES_THUMB:
                    return types.INFRASTRUCTURE_THUMB_MODE;
                case MSFTypes.INFRASTRUCTURE_SOURCES_CHART:
                    return types.INFRASTRUCTURE_CHART_MODE;
            }
        })();
        dispatch({ type: analyticsMsg });
        dispatch({ type: types.CHANGE_INFRASTRUCTURE_CHART_MODE, value });
    };
}

export function setPlumeSourceFilter(value) {
    return { type: types.SET_PLUME_SOURCE_FILTER, value };
}

export function setFlyoverFilter(value) {
    return { type: types.SET_FLYOVER_FILTER, value };
}

export function setPlumeFilterStartDate(date) {
    return { type: types.SET_PLUME_FILTER_DATE, isStart: true, date };
}

export function setPlumeFilterEndDate(date) {
    return { type: types.SET_PLUME_FILTER_DATE, isStart: false, date };
}

export function downloadPlumeData(feature) {
    Promise.all([
        fetch(feature.get("plume_tiff_url", { credentials: "same-origin" })),
        fetch(feature.get("rgb_tiff_url", { credentials: "same-origin" }))
    ])
        .then(responses => {
            const zip = new JSZip();
            responses.forEach(res => {
                zip.file(res.url.split("/")[res.url.split("/").length - 1], res.blob());
            });
            zip
                .generateAsync({ type: "blob" })
                .then(blob => saveAs(blob, `${feature.get("name")}.zip`));
        })
        .catch(err => console.log(`Error downloading plume data: ${err}`));
    return { type: coreTypes.NO_ACTION };
}
