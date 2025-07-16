# CountriesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiCountriesAllGet**](#apicountriesallget) | **GET** /api/Countries/all | |
|[**apiCountriesGet**](#apicountriesget) | **GET** /api/Countries | |
|[**apiCountriesIdDelete**](#apicountriesiddelete) | **DELETE** /api/Countries/{id} | |
|[**apiCountriesIdGet**](#apicountriesidget) | **GET** /api/Countries/{id} | |
|[**apiCountriesIdPut**](#apicountriesidput) | **PUT** /api/Countries/{id} | |
|[**apiCountriesPost**](#apicountriespost) | **POST** /api/Countries | |

# **apiCountriesAllGet**
> CountryDtoListResponse apiCountriesAllGet()


### Example

```typescript
import {
    CountriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CountriesApi(configuration);

const { status, data } = await apiInstance.apiCountriesAllGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**CountryDtoListResponse**

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

# **apiCountriesGet**
> CountryDtoPagedListResponse apiCountriesGet()


### Example

```typescript
import {
    CountriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CountriesApi(configuration);

let searchTerm: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiCountriesGet(
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

**CountryDtoPagedListResponse**

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

# **apiCountriesIdDelete**
> BooleanResponse apiCountriesIdDelete()


### Example

```typescript
import {
    CountriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CountriesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCountriesIdDelete(
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

# **apiCountriesIdGet**
> CountryDtoResponse apiCountriesIdGet()


### Example

```typescript
import {
    CountriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CountriesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCountriesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CountryDtoResponse**

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

# **apiCountriesIdPut**
> BooleanResponse apiCountriesIdPut()


### Example

```typescript
import {
    CountriesApi,
    Configuration,
    UpdateCountryDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CountriesApi(configuration);

let id: string; // (default to undefined)
let updateCountryDto: UpdateCountryDto; // (optional)

const { status, data } = await apiInstance.apiCountriesIdPut(
    id,
    updateCountryDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCountryDto** | **UpdateCountryDto**|  | |
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

# **apiCountriesPost**
> GuidResponse apiCountriesPost()


### Example

```typescript
import {
    CountriesApi,
    Configuration,
    CreateCountryDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CountriesApi(configuration);

let createCountryDto: CreateCountryDto; // (optional)

const { status, data } = await apiInstance.apiCountriesPost(
    createCountryDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCountryDto** | **CreateCountryDto**|  | |


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

