const Roadmap = () => {
  const htmlBundle = `
  <!DOCTYPE html>
  <html>
   
  <head>
      <title>Interactive Graph</title>
      <script src="https://unpkg.com/vis-network/standalone/umd/vis-network.min.js"></script>
      <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
      <style type="text/css">
          body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-family: Arial, sans-serif;
          }
   
          h1 {
              margin-bottom: 20px;
          }
   
          select {
              margin: 0 10px;
              padding: 10px;
              font-size: 16px;
          }
   
          #mynetwork {
              position: relative;
              width: 100%;
              height: 80vh;
              border: 1px solid lightgray;
              z-index: 1;
          }
   
          #legend {
              position: absolute;
              top: 200px;
              right: 40px;
              padding: 10px;
              border: 1px solid black;
              background-color: white;
              height: 150px;
              width: 200px;
              z-index: 0;
          }
   
          .legend-box {
              display: inline-block;
              width: 100px;
              height: 20px;
              margin-right: 5px;
          }
   
          .fundamentals {
              background-color: #FFCCCC;
              width: 20px;
              height: 15px;
   
          }
   
          .intermediate {
              background-color: #CCFFFF;
              width: 20px;
              height: 15px;
          }
   
          .advanced {
              background-color: #E6E6FA;
              width: 20px;
              height: 15px;
          }
   
          .special {
              background-color: lightgreen;
              width: 20px;
              height: 15px;
          }
   
          #dropdowns {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 20px;
              margin-bottom: 20px;
          }
   
          #dropdowns label {
              font-weight: bold;
          }
   
          #dropdowns select {
              padding: 5px 10px;
              font-size: 16px;
              border-radius: 5px;
              border: 1px solid #ccc;
              background-color: #f8f8f8;
              font-weight: bold;
          }
      </style>
  </head>
   
  <body>
      <h1 id="aspirationName"></h1>
      <div id="dropdowns">
          <label for="hierarchical">Hierarchical:</label>
          <select id="hierarchical">
              <option value="false">Disabled</option>
              <option value="true">Enabled</option>
          </select>
   
          <label for="direction">Direction:</label>
          <select id="direction">
              <option value="UD">Up-Down</option>
              <option value="DU">Down-Up</option>
              <option value="LR">Left-Right</option>
              <option value="RL">Right-Left</option>
          </select>
      </div>
      <div id="legend">
          <h2>Legend:</h2>
          <div><span class="legend-box fundamentals"></span> Fundamentals</div>
          <div><span class="legend-box intermediate"></span> Intermediate</div>
          <div><span class="legend-box advanced"></span> Advanced</div>
          <div><span class="legend-box special"></span> Skills you already have</div>
      </div>
      <div id="mynetwork">
          <!-- <div> -->
      </div>
      <script type="text/javascript">
   
          // Function to create the network
          function createNetwork() {
   
              var aspirationName = 'MLOps RoadMap';
              document.getElementById('aspirationName').innerText = aspirationName;
   
   
              // Get the dropdowns
              var hierarchicalDropdown = document.getElementById('hierarchical');
              var directionDropdown = document.getElementById('direction');
   
              // Parse your JSON data into nodes and edges
              var nodes = [];
              var edges = [];
              var data = {'fundamentals': [{'Programming Languages': ['Python']}, {'Scripting Languages': ['Bash']}, {'Version Control Systems': ['Experimentation Sagas']}, {'Cloud Computing': ['GCP']}, {'Containerization': ['Docker']}, {'Container Orchestration': ['Kubernetes']}, {'Data Pipelines': ['Kafka']}, {'Data Housing': ['Data Warehouses']}, {'Pipeline Craft': ['MLOps Paradigm']}, {'Continuous Integration/Continuous Deployment (CI/CD)': ['Models Boon and Bound']}, {'Cloud ML': ['FaaS and PaaS for ML']}, {'Engineering Models': ['Data Engineering Fundamentals']}, {'Database': ['Model Register']}, {'Looping': ['Orchestration Empire']}, {'Monitoring': ['DataVariant Gauge']}, {'Pioneer': ['MLOps Philomathy']}], 'intermediate': [{'Database': ['Engrams Entrusted']}, {'Looping': ['In-the-know Protocol']}, {'Pioneer': ['Discern in Dispatch']}, {'Machination': ['IaC Treasure Trove']}, {'Ecosystem': ['Schematics in Scalability']}, {'Security': ['Tales and Trust']}, {'Fulmination': ['Custodian Calls']}], 'advanced': [{'Machine Learning': ['Machine Learning Model Management']}, {'Data Versioning': ['Data Versioning']}, {'AutoML': ['Automated Machine Learning (AutoML)']}, {'Explainability': ['Model Explainability and Interpretability']}, {'Drift Detection': ['Model Drift Detection']}, {'Hyperparameter Optimization': ['Hyperparameter Optimization']}, {'A/B Testing': ['A/B Testing for ML Models']}, {'Model Serving': ['Model Serving and Inference']}, {'Feature Store': ['Feature Store']}, {'Data Governance': ['Data Governance in ML']}]};
              var special_data = {'fundamentals': [ 'Cloud Computing', 'Container Orchestration', 'Data Pipelines', 'Data Housing', 'Pipeline Craft', 'Continuous Integration/Continuous Deployment (CI/CD)', 'Cloud ML', 'Engineering Models', 'Looping', 'Monitoring', 'Pioneer'], 'intermediate': [ 'Machination', 'Ecosystem', 'Security', 'Fulmination'], 'advanced': ['Data Versioning', 'AutoML', 'Explainability', 'Drift Detection', 'Hyperparameter Optimization', 'A/B Testing', 'Model Serving', 'Feature Store', 'Data Governance']};
              // var data = JSON.parse('{{ data|tojson|safe }}');
              // var special_data = JSON.parse('{{ specialData|tojson|safe }}');
              var levels = ['fundamentals', 'intermediate', 'advanced'];
              for (var i = 0; i < levels.length; i++) {
                  var level = levels[i];
                  for (var j = 0; j < data[level].length; j++) {
                      for (var key in data[level][j]) {
                          var color;
                          if (special_data.fundamentals.includes(key)) {
                              color = '#FFCCCC';
                          } else if (special_data.intermediate.includes(key)) {
                              color = '#CCFFFF';
                          } else if (special_data.advanced.includes(key)) {
                              color = '#E6E6FA';
                          } else {
                              color = 'lightgreen';
                          }
                          nodes.push({ id: nodes.length, label: key, title: data[level][j][key].join(', '), group: level, color: color });
                          if (nodes.length > 1) {
                              edges.push({ from: nodes.length - 2, to: nodes.length - 1, arrows: 'to', label: 'move forward to' });
                          }
                      }
                  }
              }
   
              var hierarchical = hierarchicalDropdown.value === 'true';
              var direction = directionDropdown.value;
   
              var options = {
                  nodes: {
                      shape: 'box',
                      font: {
                          color: 'black',
                          size: 18
                      },
                      size: 70
                  },
                  edges: {
                      color: 'black',
                      arrows: {
                          to: {
                              enabled: true,
                              scaleFactor: 1
                          }
                      },
                      smooth: {
                          type: 'cubicBezier',
                          forceDirection: 'horizontal',
                      }
                  },
                  layout: {
                      improvedLayout: true,
                      randomSeed: undefined,
                      hierarchical: {
                          enabled: hierarchical,
                          levelSeparation: 200,
                          nodeSpacing: 150,
                          treeSpacing: 200,
                          blockShifting: false,
                          edgeMinimization: false,
                          parentCentralization: true,
                          direction: direction,
                          sortMethod: 'hubsize'
                      }
                  },
                  interaction: {
                      hover: true
                  }
              };
   
              var container = document.getElementById('mynetwork');
              var data = {
                  nodes: nodes,
                  edges: edges
              };
   
              var network = new vis.Network(container, data, options);
   
              // Add an event listener for click events on the nodes
              network.on('click', function (params) {
                  if (params.nodes.length > 0) {
                      swal("List of Topics", nodes[params.nodes[0]].title);
                  }
              });
   
              // Recreate the network when the dropdowns change
              hierarchicalDropdown.addEventListener('change', createNetwork);
              directionDropdown.addEventListener('change', createNetwork);
          }
   
          // Create the network when the page loads
          createNetwork();
   
      </script>
  </body>
  </html>
  `;

  return (
    <div className="w-screen h-screen">
      <iframe
        srcDoc={htmlBundle}
        title="HTML Bundle"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>
  );
};

export default Roadmap;