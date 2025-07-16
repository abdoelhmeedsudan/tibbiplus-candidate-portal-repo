# CitiesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiCitiesGet**](#apicitiesget) | **GET** /api/Cities | |
|[**apiCitiesIdDelete**](#apicitiesiddelete) | **DELETE** /api/Cities/{id} | |
|[**apiCitiesIdGet**](#apicitiesidget) | **GET** /api/Cities/{id} | |
|[**apiCitiesIdPut**](#apicitiesidput) | **PUT** /api/Cities/{id} | |
|[**apiCitiesPost**](#apicitiespost) | **POST** /api/Cities | |

# **apiCitiesGet**
> CityDtoPagedListResponse apiCitiesGet()


### Example

```typescript
import {
    CitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CitiesApi(configuration);

let searchTerm: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiCitiesGet(
    searchTerm,
    pageNumber,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **searchTerm** | [**string**] |  | (optional) defaults to undefined|
| **pageNumber** | [**number**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|


### Return type

**CityDtoPagedListResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCitiesIdDelete**
> BooleanResponse apiCitiesIdDelete()


### Example

```typescript
import {
    CitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CitiesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCitiesIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**BooleanResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCitiesIdGet**
> CityDtoResponse apiCitiesIdGet()


### Example

```typescript
import {
    CitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CitiesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCitiesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CityDtoResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCitiesIdPut**
> BooleanResponse apiCitiesIdPut()


### Example

```typescript
import {
    CitiesApi,
    Configuration,
    UpdateCityDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CitiesApi(configuration);

let id: string; // (default to undefined)
let updateCityDto: UpdateCityDto; // (optional)

const { status, data } = await apiInstance.apiCitiesIdPut(
    id,
    updateCityDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCityDto** | **UpdateCityDto**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**BooleanResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiCitiesPost**
> GuidResponse apiCitiesPost()


### Example

```typescript
import {
    CitiesApi,
    Configuration,
    CreateCityDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CitiesApi(configuration);

let createCityDto: CreateCityDto; // (optional)

const { status, data } = await apiInstance.apiCitiesPost(
    createCityDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCityDto** | **CreateCityDto**|  | |


### Return type

**GuidResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: application/json, text/json, application/*+json
 - **Accept**: text/plain, application/json, text/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

