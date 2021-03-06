import * as actionTypes from "_core/constants/actionTypes";
import * as actionTypesMSF from "constants/actionTypes";
import { layerSidebarState } from "reducers/models/layerSidebar";
import LayerSidebarReducer from "reducers/reducerFunctions/LayerSidebarReducer";

export default function layerSidebar(
    state = layerSidebarState,
    action,
    opt_reducer = LayerSidebarReducer
) {
    switch (action.type) {
        case actionTypesMSF.SET_LAYER_SIDEBAR_CATEGORY:
            return opt_reducer.updateActiveCategory(state, action);
        case actionTypesMSF.SET_LAYER_SIDEBAR_COLLAPSED:
            return opt_reducer.setLayerSidebarCollapsed(state, action);
        case actionTypesMSF.UPDATE_AVAILABLE_FEATURES:
            return opt_reducer.updateAvailableFeatures(state, action);
        case actionTypesMSF.FEATURE_SIDEBAR_PAGE_FORWARD:
            return opt_reducer.pageForward(state, action);
        case actionTypesMSF.FEATURE_SIDEBAR_PAGE_BACKWARD:
            return opt_reducer.pageBackward(state, action);
        case actionTypesMSF.CHANGE_LAYER_SIDEBAR_CATEGORY:
            return opt_reducer.changeSidebarCategory(state, action);
        case actionTypesMSF.UPDATE_ACTIVE_SUBCATEGORIES:
            return opt_reducer.updateActiveSubcategories(state, action);
        case actionTypesMSF.UPDATE_FEATURE_SEARCH_RESULTS:
            return opt_reducer.updateSearchResults(state, action);
        // case actionTypesMSF.AVAILABLE_LAYER_LIST_LOADED:
        //     return opt_reducer.updateSearchResults(state, action);
        case actionTypesMSF.SET_PLUME_FILTER:
            return opt_reducer.setPlumeFilter(state, action);
        case actionTypesMSF.SET_INFRASTRUCTURE_FILTER:
            return opt_reducer.setInfrastructureFilter(state, action);
        case actionTypesMSF.TOGGLE_FEATURE_LABEL:
            return opt_reducer.selectFeatureInSidebar(state, action);
        case actionTypesMSF.CLEAR_FEATURE_LABELS:
            return opt_reducer.clearFeatureLabels(state, action);
        case actionTypesMSF.UPDATE_INFRA_GLOBAL_RESULTS:
            return opt_reducer.updateInfraGlobalResults(state, action);
        case actionTypesMSF.UPDATE_PLUME_GLOBAL_RESULTS:
            return opt_reducer.updatePlumeGlobalResults(state, action);
        case actionTypesMSF.SET_TIMELINE_DATE:
            return opt_reducer.setTimelineDate(state, action);
        case actionTypesMSF.SET_PLUME_DATE_FILTER:
            return opt_reducer.setPlumeDateFilter(state, action);
        default:
            return state;
    }
}
