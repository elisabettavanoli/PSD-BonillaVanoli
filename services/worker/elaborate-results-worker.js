import { Camunda8 } from '@camunda8/sdk'

const camunda = new Camunda8({
	ZEEBE_ADDRESS: 'localhost:26500',
	//ZEEBE_REST_ADDRESS: 'http://localhost:8088',
	ZEEBE_CLIENT_ID: 'zeebe',
	ZEEBE_CLIENT_SECRET: 'zecret',
	CAMUNDA_OAUTH_STRATEGY: 'OAUTH',
	CAMUNDA_OAUTH_URL:
		'http://localhost:18080/auth/realms/camunda-platform/protocol/openid-connect/token',
	CAMUNDA_TASKLIST_BASE_URL: 'http://localhost:8082',
	CAMUNDA_OPERATE_BASE_URL: 'http://localhost:8081',
	CAMUNDA_OPTIMIZE_BASE_URL: 'http://localhost:8083',
	CAMUNDA_MODELER_BASE_URL: 'http://localhost:8070/api',
	CAMUNDA_TENANT_ID: '', // We can override values in the env by passing an empty string value
	CAMUNDA_SECURE_CONNECTION: false
})

const zeebe = camunda.getZeebeGrpcApiClient();

// susbscribe to the topic: 'charge-card'
zeebe.createWorker({
  taskType: "evaluate-answers-worker",
  taskHandler: async (job) => {
	  console.log("Handling job: " + job.key + job.type + "with payload " + JSON.stringify(job));
	  var samples_total = 10;
	  var success_average = 0.8;
	  console.log(`Handling job: ${job.key} card charged`);
	  console.log(job.variables.trialId);
	  return job.complete({
		  "samples_total": samples_total,
		  "success_average": success_average
	  });
  },
  //timeout: 15000,
});