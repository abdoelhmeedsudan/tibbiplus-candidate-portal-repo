# JobTitlesApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiJobTitlesAllGet**](#apijobtitlesallget) | **GET** /api/JobTitles/all | |
|[**apiJobTitlesGet**](#apijobtitlesget) | **GET** /api/JobTitles | |
|[**apiJobTitlesIdDelete**](#apijobtitlesiddelete) | **DELETE** /api/JobTitles/{id} | |
|[**apiJobTitlesIdGet**](#apijobtitlesidget) | **GET** /api/JobTitles/{id} | |
|[**apiJobTitlesIdPut**](#apijobtitlesidput) | **PUT** /api/JobTitles/{id} | |
|[**apiJobTitlesPost**](#apijobtitlespost) | **POST** /api/JobTitles | |

# **apiJobTitlesAllGet**
> JobTitleDtoListResponse apiJobTitlesAllGet()


### Example

```typescript
import {
    JobTitlesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobTitlesApi(configuration);

const { status, data } = await apiInstance.apiJobTitlesAllGet();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**JobTitleDtoListResponse**

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

# **apiJobTitlesGet**
> JobTitleDtoPagedListResponse apiJobTitlesGet()


### Example

```typescript
import {
    JobTitlesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobTitlesApi(configuration);

let searchTerm: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiJobTitlesGet(
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

**JobTitleDtoPagedListResponse**

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

# **apiJobTitlesIdDelete**
> BooleanResponse apiJobTitlesIdDelete()


### Example

```typescript
import {
    JobTitlesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobTitlesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiJobTitlesIdDelete(
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

# **apiJobTitlesIdGet**
> JobTitleDtoResponse apiJobTitlesIdGet()


### Example

```typescript
import {
    JobTitlesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new JobTitlesApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiJobTitlesIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**JobTitleDtoResponse**

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

# **apiJobTitlesIdPut**
> BooleanResponse apiJobTitlesIdPut()


### Example

```typescript
import {
    JobTitlesApi,
    Configuration,
    UpdateJobTitleDto
} from './api';

const configuration = new Configuration();
const apiInstance = new JobTitlesApi(configuration);

let id: string; // (default to undefined)
let updateJobTitleDto: UpdateJobTitleDto; // (optional)

const { status, data } = await apiInstance.apiJobTitlesIdPut(
    id,
    updateJobTitleDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateJobTitleDto** | **UpdateJobTitleDto**|  | |
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

# **apiJobTitlesPost**
> GuidResponse apiJobTitlesPost()


### Example

```typescript
import {
    JobTitlesApi,
    Configuration,
    CreateJobTitleDto
} from './api';

const configuration = new Configuration();
const apiInstance = new JobTitlesApi(configuration);

let createJobTitleDto: CreateJobTitleDto; // (optional)

const { status, data } = await apiInstance.apiJobTitlesPost(
    createJobTitleDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createJobTitleDto** | **CreateJobTitleDto**|  | |


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

