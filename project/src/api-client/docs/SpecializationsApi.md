# SpecializationsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiSpecializationsAllGet**](#apispecializationsallget) | **GET** /api/Specializations/all | |
|[**apiSpecializationsGet**](#apispecializationsget) | **GET** /api/Specializations | |
|[**apiSpecializationsIdDelete**](#apispecializationsiddelete) | **DELETE** /api/Specializations/{id} | |
|[**apiSpecializationsIdGet**](#apispecializationsidget) | **GET** /api/Specializations/{id} | |
|[**apiSpecializationsIdPut**](#apispecializationsidput) | **PUT** /api/Specializations/{id} | |
|[**apiSpecializationsPost**](#apispecializationspost) | **POST** /api/Specializations | |

# **apiSpecializationsAllGet**
> SpecializationDtoListResponse apiSpecializationsAllGet()


### Example

```typescript
import {
    SpecializationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpecializationsApi(configuration);

const { status, data } = await apiInstance.apiSpecializationsAllGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**SpecializationDtoListResponse**

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

# **apiSpecializationsGet**
> SpecializationDtoPagedListResponse apiSpecializationsGet()


### Example

```typescript
import {
    SpecializationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpecializationsApi(configuration);

let searchTerm: string; // (optional) (default to undefined)
let jobTitleId: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiSpecializationsGet(
    searchTerm,
    jobTitleId,
    pageNumber,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **searchTerm** | [**string**] |  | (optional) defaults to undefined|
| **jobTitleId** | [**string**] |  | (optional) defaults to undefined|
| **pageNumber** | [**number**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|


### Return type

**SpecializationDtoPagedListResponse**

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

# **apiSpecializationsIdDelete**
> BooleanResponse apiSpecializationsIdDelete()


### Example

```typescript
import {
    SpecializationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpecializationsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSpecializationsIdDelete(
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

# **apiSpecializationsIdGet**
> SpecializationDtoResponse apiSpecializationsIdGet()


### Example

```typescript
import {
    SpecializationsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SpecializationsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiSpecializationsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**SpecializationDtoResponse**

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

# **apiSpecializationsIdPut**
> BooleanResponse apiSpecializationsIdPut()


### Example

```typescript
import {
    SpecializationsApi,
    Configuration,
    UpdateSpecializationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SpecializationsApi(configuration);

let id: string; // (default to undefined)
let updateSpecializationDto: UpdateSpecializationDto; // (optional)

const { status, data } = await apiInstance.apiSpecializationsIdPut(
    id,
    updateSpecializationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateSpecializationDto** | **UpdateSpecializationDto**|  | |
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

# **apiSpecializationsPost**
> GuidResponse apiSpecializationsPost()


### Example

```typescript
import {
    SpecializationsApi,
    Configuration,
    CreateSpecializationDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SpecializationsApi(configuration);

let createSpecializationDto: CreateSpecializationDto; // (optional)

const { status, data } = await apiInstance.apiSpecializationsPost(
    createSpecializationDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSpecializationDto** | **CreateSpecializationDto**|  | |


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

