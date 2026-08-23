import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Check, ArrowUpRight } from "lucide-react";

export function ContactDialog({ children }: { children: React.ReactNode }) {
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // React 기본 전송 차단
    
    const form = event.currentTarget;
    const companyInput = form.elements.namedItem('업체명') as HTMLInputElement;
    const subjectInput = form.elements.namedItem('_subject') as HTMLInputElement;
    
    if (companyInput && subjectInput) {
      const companyName = companyInput.value;
      const dateStr = new Date().toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });
      subjectInput.value = `JH Flex 견적 문의 - ${companyName} (${dateStr})`;
    }
    
    setSent(true);
    form.submit(); // 강제 전송
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">견적 및 문의</DialogTitle>
          <DialogDescription>
            제품 사양·견적·납기 문의를 남겨주시면 빠르게 답변해 드립니다.
          </DialogDescription>
        </DialogHeader>
        
        <form 
          className="grid gap-6 py-4" 
          action="https://formsubmit.co/d87373d20662336563a93d6a8df20bd1" 
          method="POST" 
          encType="multipart/form-data" 
          onSubmit={submit}
        >
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" defaultValue="JH Flex 제품 견적 요청 드립니다" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value={window.location.href} />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">회사명 *</Label>
              <Input id="company" name="업체명" placeholder="회사명" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">담당자 *</Label>
              <Input id="name" name="담당자명" placeholder="성함" required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">연락처 *</Label>
              <Input id="phone" name="연락처" type="tel" placeholder="010-0000-0000" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">이메일 *</Label>
              <Input id="email" name="이메일" type="email" placeholder="email@company.com" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">문의 내용 *</Label>
            <Textarea 
              id="details" 
              name="문의_내용" 
              placeholder="문의 내용을 상세히 입력해 주세요. (소재, 두께, 표면처리, 희망납기 등 기재 시 빠른 답변 가능)" 
              className="min-h-[120px]"
              required 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">외형 gbr data 첨부 (선택)</Label>
            <Input id="file" type="file" name="첨부파일" />
            <p className="text-xs text-muted-foreground mt-1">
              * 업로드 가능 파일: CAD data 파일, CAM350 data 파일
            </p>
          </div>

          <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground font-bold text-base mt-2">
            {sent ? (
              <><Check className="mr-2 h-5 w-5" /> 문의가 접수되었습니다</>
            ) : (
              <>견적 문의 보내기 <ArrowUpRight className="ml-2 h-5 w-5" /></>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
