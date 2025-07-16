# NationalitiesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiNationalitiesGet**](#apinationalitiesget) | **GET** /api/Nationalities | |
|[**apiNationalitiesIdDelete**](#apinationalitiesiddelete) | **DELETE** /api/Nationalities/{id} | |
|[**apiNationalitiesIdGet**](#apinationalitiesidget) | **GET** /api/Nationalities/{id} | |
|[**apiNationalitiesIdPut**](#apinationalitiesidput) | **PUT** /api/Nationalities/{id} | |
|[**apiNationalitiesPost**](#apinationalitiespost) | **POST** /api/Nationalities | |

# **apiNationalitiesGet**
> NationalityDtoPagedListResponse apiNationalitiesGet()


### Example

```typescript
import {
    NationalitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NationalitiesApi(configuration);

let searchTerm: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiNationalitiesGet(
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

**NationalityDtoPagedListResponse**

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

# **apiNationalitiesIdDelete**
> BooleanResponse apiNationalitiesIdDelete()


### Example

```typescript
import {
    NationalitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NationalitiesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiNationalitiesIdDelete(
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

# **apiNationalitiesIdGet**
> NationalityDtoResponse apiNationalitiesIdGet()


### Example

```typescript
import {
    NationalitiesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new NationalitiesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiNationalitiesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**NationalityDtoResponse**

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

# **apiNationalitiesIdPut**
> BooleanResponse apiNationalitiesIdPut()


### Example

```typescript
import {
    NationalitiesApi,
    Configuration,
    UpdateNationalityDto
} from './api';

const configuration = new Configuration();
const apiInstance = new NationalitiesApi(configuration);

let id: string; // (default to undefined)
let updateNationalityDto: UpdateNationalityDto; // (optional)

const { status, data } = await apiInstance.apiNationalitiesIdPut(
    id,
    updateNationalityDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateNationalityDto** | **UpdateNationalityDto**|  | |
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

# **apiNationalitiesPost**
> GuidResponse apiNationalitiesPost()


### Example

```typescript
import {
    NationalitiesApi,
    Configuration,
    CreateNationalityDto
} from './api';

const configuration = new Configuration();
const apiInstance = new NationalitiesApi(configuration);

let createNationalityDto: CreateNationalityDto; // (optional)

const { status, data } = await apiInstance.apiNationalitiesPost(
    createNationalityDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createNationalityDto** | **CreateNationalityDto**|  | |


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

