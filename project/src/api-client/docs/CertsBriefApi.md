# CertsBriefApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiCertsBriefGet**](#apicertsbriefget) | **GET** /api/CertsBrief | |
|[**apiCertsBriefIdDelete**](#apicertsbriefiddelete) | **DELETE** /api/CertsBrief/{id} | |
|[**apiCertsBriefIdGet**](#apicertsbriefidget) | **GET** /api/CertsBrief/{id} | |
|[**apiCertsBriefIdPut**](#apicertsbriefidput) | **PUT** /api/CertsBrief/{id} | |
|[**apiCertsBriefPost**](#apicertsbriefpost) | **POST** /api/CertsBrief | |

# **apiCertsBriefGet**
> CertsBriefDtoPagedListResponse apiCertsBriefGet()


### Example

```typescript
import {
    CertsBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CertsBriefApi(configuration);

let certificationNameAr: string; // (optional) (default to undefined)
let certificationNameEn: string; // (optional) (default to undefined)
let issuingOrganizationAr: string; // (optional) (default to undefined)
let issuingOrganizationEn: string; // (optional) (default to undefined)
let personalInfoId: string; // (optional) (default to undefined)
let pageNumber: number; // (optional) (default to undefined)
let pageSize: number; // (optional) (default to undefined)

const { status, data } = await apiInstance.apiCertsBriefGet(
    certificationNameAr,
    certificationNameEn,
    issuingOrganizationAr,
    issuingOrganizationEn,
    personalInfoId,
    pageNumber,
    pageSize
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **certificationNameAr** | [**string**] |  | (optional) defaults to undefined|
| **certificationNameEn** | [**string**] |  | (optional) defaults to undefined|
| **issuingOrganizationAr** | [**string**] |  | (optional) defaults to undefined|
| **issuingOrganizationEn** | [**string**] |  | (optional) defaults to undefined|
| **personalInfoId** | [**string**] |  | (optional) defaults to undefined|
| **pageNumber** | [**number**] |  | (optional) defaults to undefined|
| **pageSize** | [**number**] |  | (optional) defaults to undefined|


### Return type

**CertsBriefDtoPagedListResponse**

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

# **apiCertsBriefIdDelete**
> BooleanResponse apiCertsBriefIdDelete()


### Example

```typescript
import {
    CertsBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CertsBriefApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCertsBriefIdDelete(
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

# **apiCertsBriefIdGet**
> CertsBriefDtoResponse apiCertsBriefIdGet()


### Example

```typescript
import {
    CertsBriefApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new CertsBriefApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.apiCertsBriefIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**CertsBriefDtoResponse**

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

# **apiCertsBriefIdPut**
> BooleanResponse apiCertsBriefIdPut()


### Example

```typescript
import {
    CertsBriefApi,
    Configuration,
    UpdateCertsBriefDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CertsBriefApi(configuration);

let id: string; // (default to undefined)
let updateCertsBriefDto: UpdateCertsBriefDto; // (optional)

const { status, data } = await apiInstance.apiCertsBriefIdPut(
    id,
    updateCertsBriefDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **updateCertsBriefDto** | **UpdateCertsBriefDto**|  | |
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

# **apiCertsBriefPost**
> GuidResponse apiCertsBriefPost()


### Example

```typescript
import {
    CertsBriefApi,
    Configuration,
    CreateCertsBriefDto
} from './api';

const configuration = new Configuration();
const apiInstance = new CertsBriefApi(configuration);

let createCertsBriefDto: CreateCertsBriefDto; // (optional)

const { status, data } = await apiInstance.apiCertsBriefPost(
    createCertsBriefDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createCertsBriefDto** | **CreateCertsBriefDto**|  | |


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

