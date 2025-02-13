import * as THREE from 'three';

    let scene, camera, renderer, nodes, lines;

    function init() {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 100;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.getElementById('three-container').appendChild(renderer.domElement);

      // Gradient Background
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#3498db');
      gradient.addColorStop(1, '#2c3e50');

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      const texture = new THREE.CanvasTexture(canvas);
      scene.background = texture;

      createNodes();
      createLines();

      window.addEventListener('resize', onWindowResize, false);
    }

    function createNodes() {
      nodes = [];
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });

      for (let i = 0; i < 50; i++) {
        const node = new THREE.Mesh(geometry, material);
        // Ensure initial positions are not NaN
        node.position.x = (Math.random() - 0.5) * 200;
        node.position.y = (Math.random() - 0.5) * 200;
        node.position.z = (Math.random() - 0.5) * 200;

        node.userData = {
          velocity: new THREE.Vector3(
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2,
            (Math.random() - 0.5) * 0.2
          )
        };
        nodes.push(node);
        scene.add(node);
      }
    }
    function createLines() {
        const material = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.3 });
        lines = [];

        // Remove old lines
        for (let i = 0; i < lines.length; i++) {
            scene.remove(lines[i]);
        }
        lines = [];

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const distance = nodes[i].position.distanceTo(nodes[j].position);
                if (distance < 20) {
                    const geometry = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[j].position]);
                    const line = new THREE.Line(geometry, material);
                    lines.push(line);
                    scene.add(line);
                }
            }
        }
    }

    function animate() {
      requestAnimationFrame(animate);

      // Update node positions and velocities
      nodes.forEach(node => {
        node.position.add(node.userData.velocity);

        // Clamp positions to boundaries
        node.position.x = THREE.MathUtils.clamp(node.position.x, -100, 100);
        node.position.y = THREE.MathUtils.clamp(node.position.y, -100, 100);
        node.position.z = THREE.MathUtils.clamp(node.position.z, -100, 100);

        // Bounce off the boundaries (reverse velocity)
        if (node.position.x <= -100 || node.position.x >= 100) {
          node.userData.velocity.x = -node.userData.velocity.x;
        }
        if (node.position.y <= -100 || node.position.y >= 100) {
          node.userData.velocity.y = -node.userData.velocity.y;
        }
        if (node.position.z <= -100 || node.position.z >= 100) {
          node.userData.velocity.z = -node.userData.velocity.z;
        }
      });

      createLines(); // Recreate lines each frame

      renderer.render(scene, camera);
    }

    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Update background
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#3498db');
      gradient.addColorStop(1, '#2c3e50');

      context.fillStyle = gradient;
      context.fillRect(0, 0, canvas.width, canvas.height);

      const texture = new THREE.CanvasTexture(canvas);
      scene.background = texture;
    }

    init();
    animate();
