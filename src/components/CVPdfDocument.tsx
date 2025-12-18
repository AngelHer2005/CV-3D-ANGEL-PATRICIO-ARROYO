// src/components/CVPdfDocument.tsx
import { Page, Text, View, Document, StyleSheet, Image, Link, Svg, Path } from '@react-pdf/renderer';

// --- PALETA DE COLORES ---
const colors = {
  sidebarBg: '#18212F',
  sidebarText: '#F3F4F6',
  primary: '#00778B',
  textDark: '#1F2937',
  textGray: '#4B5563',
  border: '#E5E7EB',
  white: '#FFFFFF',
  barBg: '#2D3748'
};

// --- ESTILOS ---
const styles = StyleSheet.create({
  page: { flexDirection: 'row', fontFamily: 'Helvetica', backgroundColor: '#FFFFFF' },
  
  // === SIDEBAR (IZQUIERDA) ===
  sidebar: {
    width: '32%',
    backgroundColor: colors.sidebarBg,
    padding: 24,
    color: colors.sidebarText,
    height: '100%'
  },
  photoContainer: { alignItems: 'center', marginBottom: 30, marginTop: 15 },
  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    objectFit: 'cover',
    borderWidth: 3,
    borderColor: '#374151'
  },
  
  sidebarSection: { marginBottom: 25 },
  
  sidebarTitle: {
    fontSize: 9, 
    fontWeight: 'bold',
    letterSpacing: 1, 
    marginBottom: 12,
    textTransform: 'uppercase',
    color: '#E2E8F0',
    borderBottomWidth: 1,
    borderBottomColor: '#4B5563',
    paddingBottom: 5,
    marginTop: 5
  },
  
  // Skills
  skillContainer: { marginBottom: 12 },
  skillHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  skillLabel: { fontSize: 9, color: '#E2E8F0', fontWeight: 'bold' },
  skillValue: { fontSize: 8, color: '#9CA3AF' },
  progressBarBg: { height: 5, backgroundColor: colors.barBg, borderRadius: 2.5 },
  progressBarFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 2.5 },

  // Habilidades Blandas
  softSkillsContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 6,
    marginTop: 5,
    justifyContent: 'center'
  },
  softSkillTag: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: '#4B5563',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    fontSize: 8,
    color: '#D1D5DB',
    textAlign: 'center',
    marginBottom: 4
  },

  // === MAIN (DERECHA) ===
  main: { width: '68%', padding: 35, paddingRight: 40 },
  
  // Header
  header: { marginBottom: 30 },
  nameDark: { fontSize: 26, fontWeight: 'heavy', color: '#111827', textTransform: 'uppercase', lineHeight: 1 },
  namePrimary: { fontSize: 26, fontWeight: 'heavy', color: colors.primary, textTransform: 'uppercase', lineHeight: 1, marginBottom: 6 },
  jobTitle: { fontSize: 12, color: '#6B7280', marginBottom: 15, fontWeight: 'medium' },
  
  // Contacto
  contactContainer: { gap: 8 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  contactText: { fontSize: 9, color: '#4B5563', textDecoration: 'none' },
  icon: { width: 10, height: 10 },

  // Secciones
  section: { marginBottom: 25 },
  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12,
    marginTop: 5
  },
  sectionTitle: {
    fontSize: 11,
    color: '#1F2937',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginRight: 10
  },
  sectionLine: {
    flexGrow: 1,
    height: 1,
    backgroundColor: '#E5E7EB'
  },
  paragraph: { 
    fontSize: 10, 
    lineHeight: 1.6, 
    color: '#374151', 
    textAlign: 'justify' 
  },

  // Educación
  eduItem: { 
    marginBottom: 15, 
    paddingLeft: 15, 
    borderLeftWidth: 2, 
    borderLeftColor: '#E5E7EB',
    position: 'relative',
    marginLeft: 3
  },
  eduDot: {
    position: 'absolute',
    left: -18.5, 
    top: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary
  },
  eduHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 },
  eduTitle: { fontSize: 10, fontWeight: 'bold', color: '#1F2937' },
  eduDate: { 
    fontSize: 8, 
    color: colors.primary, 
    backgroundColor: '#E0F2F1', 
    paddingHorizontal: 6, 
    paddingVertical: 2, 
    borderRadius: 3,
    fontWeight: 'bold'
  },
  eduSubtitle: { fontSize: 9, color: '#4B5563' },

  // Certificaciones
  certGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  certCard: { 
    width: '48%', 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    borderRadius: 6, 
    padding: 10,
    backgroundColor: '#FAFAFA'
  },
  certTitle: { fontSize: 9, fontWeight: 'bold', color: '#374151', marginBottom: 3 },
  certIssuer: { fontSize: 8, color: '#6B7280' },
  certDate: { fontSize: 7, color: '#9CA3AF', marginTop: 5, textAlign: 'right' },

  // Footer (TEXTO AUMENTADO)
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  footerLabel: { 
    fontSize: 10, // Aumentado a 10pt (antes 8)
    color: '#000000', 
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  footerValue: {
    fontSize: 10, // Aumentado a 10pt (antes 8)
    color: '#000000', 
    fontWeight: 'normal',
    textTransform: 'none'
  }
});

// --- ICONOS SVG ---
const IconMail = () => (
  <Svg viewBox="0 0 24 24" style={styles.icon}>
    <Path fill={colors.primary} d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </Svg>
);
const IconLinkedin = () => (
  <Svg viewBox="0 0 24 24" style={styles.icon}>
    <Path fill={colors.primary} d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </Svg>
);
const IconGithub = () => (
  <Svg viewBox="0 0 24 24" style={styles.icon}>
    <Path fill={colors.primary} d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </Svg>
);
const IconPhone = () => (
  <Svg viewBox="0 0 24 24" style={styles.icon}>
    <Path fill={colors.primary} d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </Svg>
);
const IconMap = () => (
  <Svg viewBox="0 0 24 24" style={styles.icon}>
    <Path fill={colors.primary} d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
  </Svg>
);

// --- COMPONENTES AUXILIARES ---
const SkillBar = ({ label, percent }: { label: string, percent: number }) => (
  <View style={styles.skillContainer}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillLabel}>{label}</Text>
      <Text style={styles.skillValue}>{percent}%</Text>
    </View>
    <View style={styles.progressBarBg}>
      <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
    </View>
  </View>
);

const CVPdfDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* --- SIDEBAR IZQUIERDO --- */}
      <View style={styles.sidebar}>
        <View style={styles.photoContainer}>
            <Image 
                src="/angel-patricio-photo.jpeg" 
                style={styles.photo} 
            />
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Habilidades Técnicas</Text>
          <SkillBar label="Python / Django" percent={80} />
          <SkillBar label="Java" percent={85} />
          <SkillBar label="JavaScript" percent={75} />
          <SkillBar label="TypeScript" percent={70} />
          <SkillBar label="Node.JS" percent={70} />
          <SkillBar label="React" percent={75} />
          <SkillBar label="MySQL" percent={90} />
          <SkillBar label="AWS" percent={55} />
          <SkillBar label="Microsoft Azure" percent={40} />
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Habilidades Blandas</Text>
          <View style={styles.softSkillsContainer}>
            {['Responsabilidad', 'Respeto', 'Trabajo en Equipo', 'Proactividad', 'Adaptabilidad', 'Pensamiento Crítico'].map(s => (
              <Text key={s} style={styles.softSkillTag}>{s}</Text>
            ))}
          </View>
        </View>

        <View style={styles.sidebarSection}>
          <Text style={styles.sidebarTitle}>Idiomas</Text>
          <SkillBar label="Inglés" percent={50} />
          <Text style={{fontSize: 7, color: '#A0AEC0', marginTop: 2, textAlign: 'right'}}>Nivel Intermedio (B1/B2)</Text>
        </View>
      </View>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <View style={styles.main}>
        
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.nameDark}>ANGEL HERNAN</Text>
          <Text style={styles.namePrimary}>PATRICIO ARROYO</Text>
          <Text style={styles.jobTitle}>Ingeniería de Software con Inteligencia Artificial</Text>
          
          <View style={styles.contactContainer}>
             <View style={styles.contactRow}>
                <IconMail />
                <Link src="mailto:angelhernanpatricioarroyo@gmail.com" style={styles.contactText}>angelhernanpatricioarroyo@gmail.com</Link>
             </View>
             <View style={styles.contactRow}>
                <IconLinkedin />
                <Link src="https://linkedin.com/in/angelhernanpatricioarroyo" style={styles.contactText}>linkedin.com/in/angelhernanpatricioarroyo</Link>
             </View>
             <View style={styles.contactRow}>
                <IconGithub />
                <Link src="https://github.com/AngelHer2005" style={styles.contactText}>github.com/AngelHer2005</Link>
             </View>
             <View style={styles.contactRow}>
                <IconPhone />
                <Text style={styles.contactText}>+51 997 150 226</Text>
                <View style={{width: 15}}></View>
                <IconMap />
                <Text style={styles.contactText}>Callao, Perú</Text>
             </View>
          </View>
        </View>

        {/* PERFIL */}
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Perfil Profesional</Text>
                <View style={styles.sectionLine} />
            </View>
            <Text style={styles.paragraph}>
                Egresado de Ingeniería de Software con especialización en Inteligencia Artificial. Me caracterizo por mi capacidad analítica y compromiso con la calidad de código. Actualmente busco oportunidades para aplicar mis conocimientos en Python, Cloud Computing y desarrollo web, aportando valor a través de soluciones tecnológicas innovadoras.
            </Text>
        </View>

        {/* FORMACIÓN */}
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Formación Académica</Text>
                <View style={styles.sectionLine} />
            </View>
            <View style={styles.eduItem}>
                <View style={styles.eduDot} />
                <View style={styles.eduHeader}>
                    <Text style={styles.eduTitle}>Ingeniería de Software con IA</Text>
                    <Text style={styles.eduDate}>2023 - 2025</Text>
                </View>
                <Text style={styles.eduSubtitle}>SENATI, Independencia</Text>
            </View>
            <View style={styles.eduItem}>
                <View style={styles.eduDot} />
                <View style={styles.eduHeader}>
                    <Text style={styles.eduTitle}>Educación Secundaria</Text>
                    <Text style={styles.eduDate}>2017 - 2022</Text>
                </View>
                <Text style={styles.eduSubtitle}>I.E. Isabel Chimpu Ocllo (Tercio Superior)</Text>
            </View>
        </View>

        {/* CERTIFICACIONES */}
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Certificaciones</Text>
                <View style={styles.sectionLine} />
            </View>
            <View style={styles.certGrid}>
                <View style={styles.certCard}>
                    <Text style={styles.certTitle}>AWS Academy Cloud Operations</Text>
                    <Text style={styles.certIssuer}>Amazon Web Services</Text>
                    <Text style={styles.certDate}>Oct 2025</Text>
                </View>
                <View style={styles.certCard}>
                    <Text style={styles.certTitle}>AWS Academy Cloud Foundations</Text>
                    <Text style={styles.certIssuer}>Amazon Web Services</Text>
                    <Text style={styles.certDate}>Sep 2025</Text>
                </View>
                <View style={styles.certCard}>
                    <Text style={styles.certTitle}>Cybersecurity Essentials</Text>
                    <Text style={styles.certIssuer}>Cisco Networking Academy</Text>
                    <Text style={styles.certDate}>May 2023</Text>
                </View>
                <View style={styles.certCard}>
                    <Text style={styles.certTitle}>EnglishScore (British Council)</Text>
                    <Text style={styles.certIssuer}>Certificación Internacional</Text>
                    <Text style={styles.certDate}>Nov 2025</Text>
                </View>
                <View style={styles.certCard}>
                    <Text style={styles.certTitle}>Internet of Things (IoT)</Text>
                    <Text style={styles.certIssuer}>Cisco Networking Academy</Text>
                    <Text style={styles.certDate}>Abr 2023</Text>
                </View>
            </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
            <Text style={styles.footerLabel}>DNI: <Text style={styles.footerValue}>74307947</Text></Text>
            <Text style={styles.footerLabel}>CONADIS: <Text style={styles.footerValue}>RD448107</Text></Text>
            <Text style={styles.footerLabel}>NACIMIENTO: <Text style={styles.footerValue}>31/12/2005</Text></Text>
        </View>

      </View>
    </Page>
  </Document>
);

export default CVPdfDocument;