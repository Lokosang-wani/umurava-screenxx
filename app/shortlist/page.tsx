'use client';
import { Download, Calendar, Sparkles, CheckCircle2, AlertTriangle, Users, CheckSquare, TrendingUp, Cpu, Globe, X, Clock } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import NoData from '@/components/shared/NoData';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApplicants } from '../../store/slices/applicantsSlice';
import { AppDispatch, RootState } from '../../store/store';

export default function Shortlist() {
  const dispatch = useDispatch<AppDispatch>();
  const { list: applicants, status } = useSelector((state: RootState) => state.applicants);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchApplicants());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return (
      <div className="bg-gray-50 min-h-screen p-8 max-w-7xl mx-auto flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Get candidates with AI analysis, sort by match score descending
  const analyzedCandidates = [...applicants]
    .filter(app => app.ai_analysis && app.ai_analysis.length > 0)
    .sort((a, b) => (b.match_score || 0) - (a.match_score || 0));

  const topCandidates = analyzedCandidates.slice(0, 3);
  const topCandidate = topCandidates[0];
  const otherCandidates = topCandidates.slice(1);

  const totalPipeline = applicants.length;
  const verifiedExpertise = analyzedCandidates.length;

  return (
    <div className="bg-gray-50 min-h-screen p-8 max-w-7xl mx-auto space-y-8 relative">
      {topCandidates.length === 0 ? (
        <div className="pt-20">
          <NoData 
            icon={Sparkles}
            title="No analysis results yet"
            description="Run AI Analysis on your applicants to see the top matches and density insights here."
          />
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-end">
            <div>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded mb-3 tracking-wider uppercase">AI Powered Selection</span>
              <h1 className="text-3xl font-bold text-[#0B1B42]">Shortlist Analysis</h1>
              <p className="text-gray-500 mt-2">Gemini evaluated {totalPipeline} candidates to find your top matches.</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Candidates */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Top Candidate */}
              {topCandidate && (
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
                   <div className="flex justify-between items-start mb-8">
                     <div className="flex items-center space-x-4">
                       <div className="w-14 h-14 bg-[#0B1B42] text-white rounded-xl flex items-center justify-center text-2xl font-bold shadow-sm">1</div>
                       <div>
                         <Link href={`/applicants/${topCandidate.id}`} className="text-xl font-bold text-[#0B1B42] hover:text-blue-600 hover:underline">{topCandidate.name}</Link>
                         <p className="text-sm text-gray-500 mt-1">Applying for: {topCandidate.jobs?.title || 'Unknown Role'}</p>
                       </div>
                     </div>
                     <div className="text-right">
                       <span className="text-4xl font-light text-green-500">{topCandidate.match_score || 0}%</span>
                       <p className="text-[10px] font-bold text-gray-400 tracking-wider uppercase">Match Score</p>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-gray-100 pt-8">
                     
                     {/* Technical DNA */}
                     <div>
                       <div className="flex items-center space-x-2 text-[#0B1B42] font-bold mb-4">
                         <Cpu className="w-5 h-5 text-blue-600" />
                         <span>Core Technical DNA</span>
                       </div>
                       <div className="flex flex-wrap gap-2 mb-8">
                         {topCandidate.ai_analysis?.[0]?.technical_dna?.map((dna: string, i: number) => (
                           <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">{dna}</span>
                         )) || <span className="text-xs text-gray-400 italic">No DNA identified</span>}
                       </div>

                       <div className="space-y-4">
                         <div>
                           <div className="flex justify-between text-xs font-bold mb-1">
                             <span className="text-gray-700">Algorithmic Fit</span>
                             <span className="text-[#0B1B42]">{topCandidate.ai_analysis?.[0]?.algorithmic_fit_score || 0}%</span>
                           </div>
                           <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-[#0B1B42] h-full" style={{width: `${topCandidate.ai_analysis?.[0]?.algorithmic_fit_score || 0}%`}}></div>
                           </div>
                         </div>
                         <div>
                           <div className="flex justify-between text-xs font-bold mb-1">
                             <span className="text-gray-700">Architecture Skills</span>
                             <span className="text-[#0B1B42]">{topCandidate.ai_analysis?.[0]?.architecture_score || 0}%</span>
                           </div>
                           <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-[#0B1B42] h-full" style={{width: `${topCandidate.ai_analysis?.[0]?.architecture_score || 0}%`}}></div>
                           </div>
                         </div>
                       </div>
                     </div>

                     {/* Gemini Insights */}
                     <div>
                       <div className="flex items-center space-x-2 text-[#0B1B42] font-bold mb-4">
                         <Sparkles className="w-5 h-5 text-indigo-600" />
                         <span>Gemini Insights</span>
                       </div>
                       
                       <div className="mb-4">
                         <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Strengths</span>
                         <ul className="mt-2 space-y-2">
                           {topCandidate.ai_analysis?.[0]?.strengths?.map((strength: string, i: number) => (
                             <li key={i} className="flex items-start space-x-2">
                               <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                               <span className="text-sm text-gray-700">{strength}</span>
                             </li>
                           )) || <li className="text-xs text-gray-400 italic">None</li>}
                         </ul>
                       </div>

                       <div className="mb-6">
                         <span className="text-[10px] font-bold text-blue-600 tracking-wider uppercase">Gaps</span>
                         <ul className="mt-2 space-y-2">
                           {topCandidate.ai_analysis?.[0]?.gaps?.map((gap: string, i: number) => (
                             <li key={i} className="flex items-start space-x-2">
                               <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                               <span className="text-sm text-gray-700">{gap}</span>
                             </li>
                           )) || <li className="text-xs text-gray-400 italic">None</li>}
                         </ul>
                       </div>

                       <p className="text-xs text-indigo-800 italic bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                         "{topCandidate.ai_analysis?.[0]?.recommendation_summary || 'Analysis complete. Awaiting review.'}"
                       </p>
                     </div>
                     
                   </div>
                </div>
              )}

              {/* Other Candidates Grid */}
              {otherCandidates.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {otherCandidates.map((candidate, idx) => (
                    <div key={candidate.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col h-full">
                       <div className="flex justify-between items-start mb-6">
                         <div className="flex items-center space-x-3">
                           <div className="w-10 h-10 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center font-bold">{idx + 2}</div>
                           <div>
                             <h3 className="font-bold text-[#0B1B42] truncate max-w-[120px]" title={candidate.name}>{candidate.name}</h3>
                             <p className="text-xs text-gray-500 truncate max-w-[120px]">{candidate.jobs?.title}</p>
                           </div>
                         </div>
                         <span className="text-2xl font-light text-green-500">{candidate.match_score || 0}%</span>
                       </div>
                       
                       <div className="mb-6 flex-grow">
                         <div className="flex items-center space-x-2 mb-2">
                           <Sparkles className="w-3 h-3 text-indigo-600" />
                           <span className="text-[10px] font-bold text-[#0B1B42] uppercase tracking-wider">Analysis Summary</span>
                         </div>
                         <p className="text-sm text-gray-600 line-clamp-3">
                           {candidate.ai_analysis?.[0]?.recommendation_summary || 'Good match for the role requirements.'}
                         </p>
                       </div>
                       
                       <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                          {candidate.ai_analysis?.[0]?.technical_dna?.slice(0, 2).map((dna: string, i: number) => (
                            <span key={i} className="px-2 py-1 bg-gray-50 text-gray-600 rounded border border-gray-200 text-[10px] font-medium">{dna}</span>
                          ))}
                       </div>
                       
                       <Link href={`/applicants/${candidate.id}`} className="block text-center w-full py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">View Deep Dive</Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Analytics */}
            <div className="space-y-6">
              
              {/* Talent Density */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="text-lg font-bold text-[#0B1B42] mb-6">Talent Density Analysis</h2>
                
                <div className="bg-gray-200 h-40 rounded-lg mb-6 relative flex items-center justify-center overflow-hidden">
                  <Globe className="w-32 h-32 text-gray-300 absolute" />
                  {/* Map Dots Mockup */}
                  <div className="absolute w-3 h-3 bg-[#0B1B42] rounded-full left-[20%] top-[40%] shadow-lg shadow-blue-500/50"></div>
                  <div className="absolute w-2 h-2 bg-blue-500 rounded-full left-[70%] top-[30%]"></div>
                  <div className="absolute w-2 h-2 bg-blue-500 rounded-full left-[50%] top-[60%]"></div>
                  
                  {/* Overlay card */}
                  <div className="absolute bottom-2 right-2 bg-white p-3 rounded-lg shadow-sm border border-gray-100 text-xs">
                     <p className="text-gray-500 font-medium">Sourcing Origin</p>
                     <p className="font-bold text-[#0B1B42] mt-1">Silicon Valley, USA <span className="text-blue-600">65% of Top candidates</span></p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">Total Pipeline</span>
                    </div>
                    <span className="font-bold text-[#0B1B42]">{totalPipeline}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3 text-gray-600">
                      <CheckSquare className="w-5 h-5" />
                      <span className="text-sm font-medium">Verified Expertise</span>
                    </div>
                    <span className="font-bold text-[#0B1B42]">{verifiedExpertise}</span>
                  </div>
                </div>
              </div>

              {/* Market Competitiveness */}
              <div className="bg-[#2D3B6A] rounded-xl overflow-hidden shadow-sm text-white">
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <TrendingUp className="w-5 h-5 text-blue-300" />
                    <h2 className="text-lg font-bold">Market Competitiveness</h2>
                  </div>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Based on the current talent pool, your budget for the role is in the <strong className="text-white">top 15%</strong> of the market. This allows you to attract candidates from Tier 1 labs like DeepMind and OpenAI.
                  </p>
                </div>
                
                <div className="h-32 bg-[#212C54] relative flex items-end justify-around px-4 pt-4 overflow-hidden">
                   {/* Mockup Chart */}
                   <div className="w-10 bg-white/20 rounded-t h-[20%] hover:bg-white/30 transition-colors"></div>
                   <div className="w-10 bg-white/20 rounded-t h-[40%] hover:bg-white/30 transition-colors"></div>
                   <div className="w-10 bg-white/20 rounded-t h-[50%] hover:bg-white/30 transition-colors"></div>
                   <div className="w-10 bg-white/20 rounded-t h-[70%] hover:bg-white/30 transition-colors"></div>
                   <div className="w-10 bg-green-400 rounded-t h-[95%] shadow-[0_0_15px_rgba(74,222,128,0.3)] z-10"></div>
                   <div className="w-10 bg-white/20 rounded-t h-[80%] hover:bg-white/30 transition-colors"></div>
                </div>
                
                <div className="grid grid-cols-2 bg-[#1B2447] p-4 text-center divide-x divide-gray-600">
                   <div>
                     <p className="text-[10px] text-blue-200 uppercase tracking-wider font-bold mb-1">Avg. Tenure</p>
                     <p className="text-lg font-bold">2.4 Years</p>
                   </div>
                   <div>
                     <p className="text-[10px] text-blue-200 uppercase tracking-wider font-bold mb-1">Expected Salary</p>
                     <p className="text-lg font-bold">$240k - $310k</p>
                   </div>
                </div>
              </div>

            </div>
          </div>
        </>
      )}
    </div>
  );
}
