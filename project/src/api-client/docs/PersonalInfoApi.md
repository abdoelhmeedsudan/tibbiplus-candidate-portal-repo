# PersonalInfoApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiPersonalInfoGet**](#apipersonalinfoget) | **GET** /api/PersonalInfo | |
|[**apiPersonalInfoIdDelete**](#apipersonalinfoiddelete) | **DELETE** /api/PersonalInfo/{id} | |
|[**apiPersonalInfoIdGet**](#apipersonalinfoidget) | **GET** /api/PersonalInfo/{id} | |
|[**apiPersonalInfoIdPut**](#apipersonalinfoidput) | **PUT** /api/PersonalInfo/{id} | |
|[**apiPersonalInfoPost**](#apipersonalinfopost) | **POST** /api/PersonalInfo | |

# **apiPersonalInfoGet**
> PersonalInfoDtoPagedListResponse apiPersonalInfoGet()


### Example

```typescript
import {
    PersonalInfoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PersonalInfoApi(configuration);

let fullNameAr: string; // (optional) (default to undefined)
let fullNameEn: string; // (optional) (default to undefined)
let idNumber: string; // (optional) (default to undefined)
let passportNumber: string; // (optional) (default to undefined)
let email: string; // (optional) (default to undefined)
let mobile: string; // (optional) (default to undefined)
let nationalityId: string; // (optional) (default to undefined)
let cityId: string; // (optional) (default to undefined)
let jobTitleId: string; // (optional) (default to undefined)
let maritalStatusId: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiPersonalInfoGet(
    fullNameAr,
    fullNameEn,
    idNumber,
    passportNumber,
    email,
    mobile,
    nationalityId,
    cityId,
    jobTitleId,
    maritalStatusId,
    pageNumber,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **fullNameAr** | [**string**] |  | (optional) defaults to undefined|
| **fullNameEn** | [**string**] |  | (optional) defaults to undefined|
| **idNumber** | [**string**] |  | (optional) defaults to undefined|
| **passportNumber** | [**string**] |  | (optional) defaults to undefined|
| **email** | [**string**] |  | (optional) defaults to undefined|
| **mobile** | [**string**] |  | (optional) defaults to undefined|
| **nationalityId** | [**string**] |  | (optional) defaults to undefined|
| **cityId** | [**string**] |  | (optional) defaults to undefined|
| **jobTitleId** | [**string**] |  | (optional) defaults to undefined|
| **maritalStatusId** | [**string**] |  | (optional) defaults to undefined|
| **pageNumber** | [**number**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|


### Return type

**PersonalInfoDtoPagedListResponse**

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

# **apiPersonalInfoIdDelete**
> BooleanResponse apiPersonalInfoIdDelete()


### Example

```typescript
import {
    PersonalInfoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PersonalInfoApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPersonalInfoIdDelete(
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

# **apiPersonalInfoIdGet**
> PersonalInfoDtoResponse apiPersonalInfoIdGet()


### Example

```typescript
import {
    PersonalInfoApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PersonalInfoApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiPersonalInfoIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**PersonalInfoDtoResponse**

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

# **apiPersonalInfoIdPut**
> BooleanResponse apiPersonalInfoIdPut()


### Example

```typescript
import {
    PersonalInfoApi,
    Configuration,
    UpdatePersonalInfoDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PersonalInfoApi(configuration);

let id: string; // (default to undefined)
let updatePersonalInfoDto: UpdatePersonalInfoDto; // (optional)

const { status, data } = await apiInstance.apiPersonalInfoIdPut(
    id,
    updatePersonalInfoDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updatePersonalInfoDto** | **UpdatePersonalInfoDto**|  | |
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

# **apiPersonalInfoPost**
> GuidResponse apiPersonalInfoPost()


### Example

```typescript
import {
    PersonalInfoApi,
    Configuration,
    CreatePersonalInfoDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PersonalInfoApi(configuration);

let createPersonalInfoDto: CreatePersonalInfoDto; // (optional)

const { status, data } = await apiInstance.apiPersonalInfoPost(
    createPersonalInfoDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createPersonalInfoDto** | **CreatePersonalInfoDto**|  | |


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

