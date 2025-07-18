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

zeebe.createWorker({
  taskType: "evaluate-answers-worker",
  taskHandler: async (job) => {
    const collaboratorsAnswers = job.variables.collaborators_answers || [];

    // Estrai solo gli ID dei collaboratori che hanno risposto "yes" e rimuovi duplicati
    const participantsIds = Array.from(new Set(
      collaboratorsAnswers
        .filter(([_, answer]) => answer === "yes")
        .map(([collaborator_id, _]) => collaborator_id)
    ));

    //const approved = participants.length > 2;
      const approved = true;

    console.log(`Participants: ${participantsIds}, Approved: ${approved}`);

    return job.complete({
        participantsIds,
        approved
    });
  },
  //timeout: 15000,
});