import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function FluidBackground() {
  const containerRef = useRef(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const scene = new THREE.Scene()

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(container.clientWidth, container.clientHeight)
    container.appendChild(renderer.domElement)

    const geometry = new THREE.PlaneGeometry(2, 2)
    const uniforms = {
      u_time: { value: 0 },
      u_res: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
      u_color1: { value: new THREE.Color('#E7F0FA') },
      u_color2: { value: new THREE.Color('#7BA4D0') },
      u_grain: { value: 0.05 },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform float u_time;
        uniform vec2 u_res;
        uniform vec3 u_color1;
        uniform vec3 u_color2;
        uniform float u_grain;

        float noise(vec2 p){
          return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453);
        }

        void main(){
          vec2 uv = vUv;
          vec2 c = vec2(0.6 + 0.02*sin(u_time*0.022), 0.5 + 0.02*cos(u_time*0.02));
          float d = distance(uv, c);
          float t = smoothstep(0.8, 0.0, d);
          vec3 col = mix(u_color1, u_color2, t);

          float w = 0.02 * sin((uv.x + uv.y) * 10.0 + u_time * 0.022);
          col = mix(col, u_color2, w*0.5 + 0.5);

          float g = noise(uv * u_res + u_time) * u_grain;
          col = mix(col, vec3(1.0), g*0.1);
          gl_FragColor = vec4(col, 1.0);
        }
      `,
      transparent: true,
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    const onResize = () => {
      const { clientWidth, clientHeight } = container
      renderer.setSize(clientWidth, clientHeight)
      uniforms.u_res.value.set(clientWidth, clientHeight)
    }
    window.addEventListener('resize', onResize)

    const start = performance.now()
    const render = () => {
      uniforms.u_time.value = (performance.now() - start) / 1000
      renderer.render(scene, camera)
      rafRef.current = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      container.removeChild(renderer.domElement)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0" aria-hidden="true" />
}
